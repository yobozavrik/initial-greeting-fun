import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Persona = 'seller' | 'cosmetologist' | 'teacher' | 'chat';

const personas = [
  { id: 'seller' as Persona, title: 'ШІ-продавець', description: 'Допомога з робочими питаннями' },
  { id: 'cosmetologist' as Persona, title: 'ШІ-косметолог', description: 'Консультації з краси та догляду' },
  { id: 'teacher' as Persona, title: 'Помічник з уроками', description: 'Допомога з навчальними завданнями' },
  { id: 'chat' as Persona, title: 'Просто потеревенькати', description: 'Вільна розмова' },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const getTelegramInitData = () => {
    if ((window as any).Telegram?.WebApp) {
      return (window as any).Telegram.WebApp.initData || '';
    }
    return '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await sendMessage('', base64Audio);
        };
        
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося отримати доступ до мікрофона',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendMessage = async (text?: string, audioBase64?: string) => {
    if (!selectedPersona) return;
    if (!text && !audioBase64) return;

    const messageText = text || '[Голосове повідомлення]';
    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const payload = {
        persona: selectedPersona,
        message: text || '',
        audio: audioBase64 || null,
        initData: getTelegramInitData(),
      };

      const response = await fetch('https://n8n.dmytrotovstytskyi.online/webhook-test/aisupport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data && Array.isArray(data) && data[0]?.output) {
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: data[0].output 
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Невірний формат відповіді');
      }
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося отримати відповідь від асистента',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPersona) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Оберіть асистента</h2>
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPersona(persona.id)}
          >
            <h3 className="font-semibold mb-1">{persona.title}</h3>
            <p className="text-sm text-muted-foreground">{persona.description}</p>
          </Card>
        ))}
      </div>
    );
  }

  const currentPersona = personas.find(p => p.id === selectedPersona);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedPersona(null);
            setMessages([]);
          }}
        >
          Змінити асистента
        </Button>
      </div>

      <Card className="flex-1 mb-4 p-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="font-semibold mb-2">{currentPersona?.title}</p>
            <p>Задайте своє питання текстом або голосом</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground ml-8'
                : 'bg-muted mr-8'
            }`}
          >
            {msg.content}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Думаю...</span>
          </div>
        )}
      </Card>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введіть повідомлення..."
          className="flex-1 min-h-[60px]"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
        />
        <div className="flex flex-col gap-2">
          <Button
            size="icon"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={isRecording ? 'destructive' : 'secondary'}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
