import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Bot, BookOpen, Package, ClipboardCheck, GraduationCap } from "lucide-react";
import { AIAssistant } from '@/components/AIAssistant';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Checklists } from '@/components/Checklists';
import { KnowledgeTests } from '@/components/KnowledgeTests';

const Index = () => {
  const [userName, setUserName] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'ai' | 'knowledge' | 'products' | 'checklists' | 'tests'>('home');

  useEffect(() => {
    // Initialize Telegram WebApp
    if ((window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserName(user.first_name || 'Продавець');
      }
    }
  }, []);

  const menuItems = [
    { id: 'ai', icon: Bot, title: 'ШІ-помічник', color: 'bg-primary' },
    { id: 'knowledge', icon: BookOpen, title: 'База Знань', color: 'bg-secondary' },
    { id: 'products', icon: Package, title: 'Наша Продукція', color: 'bg-accent' },
    { id: 'checklists', icon: ClipboardCheck, title: 'Чек-листи', color: 'bg-muted' },
    { id: 'tests', icon: GraduationCap, title: 'Перевірка Знань', color: 'bg-primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">Ідеальний Продавець 2.0</h1>
        <p className="text-sm opacity-90">Привіт, {userName}! 👋</p>
      </div>

      {currentView === 'home' && (
        <div className="p-6">
          <p className="text-muted-foreground mb-6 text-center">
            Оберіть розділ для роботи
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentView(item.id as any)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`${item.color} p-4 rounded-full`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentView !== 'home' && (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('home')}
            className="mb-4 text-primary hover:underline flex items-center gap-2"
          >
            ← Назад до меню
          </button>
          
          {currentView === 'ai' && <AIAssistant />}
          {currentView === 'knowledge' && <KnowledgeBase />}
          {currentView === 'products' && <ProductCatalog />}
          {currentView === 'checklists' && <Checklists />}
          {currentView === 'tests' && <KnowledgeTests />}
        </div>
      )}
    </div>
  );
};

export default Index;
