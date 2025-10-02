import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const knowledgeData = [
  {
    id: 'poster',
    title: 'Робота з касовими змінами в Poster',
    content: `
      <h3 class="font-bold mb-2">Відкриття зміни:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Увійдіть в додаток Poster на планшеті</li>
        <li>Натисніть кнопку "Відкрити зміну"</li>
        <li>Введіть суму готівки в касі на початок зміни</li>
        <li>Підтвердіть відкриття зміни</li>
      </ol>
      
      <h3 class="font-bold mt-4 mb-2">Закриття зміни:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Натисніть кнопку "Закрити зміну"</li>
        <li>Порахуйте фактичну готівку в касі</li>
        <li>Введіть фактичну суму</li>
        <li>Система покаже різницю (якщо є)</li>
        <li>Підтвердіть закриття зміни</li>
      </ol>
    `
  },
  {
    id: 'prro',
    title: 'Робота з фіскалізацією (ПРРО)',
    content: `
      <h3 class="font-bold mb-2">Що таке ПРРО?</h3>
      <p class="mb-4">ПРРО - це програмний реєстратор розрахункових операцій. Він автоматично реєструє всі продажі.</p>
      
      <h3 class="font-bold mb-2">Важливо:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Кожен чек повинен бути фіскалізованим</li>
        <li>Перевіряйте статус ПРРО на початку зміни</li>
        <li>При помилках негайно повідомте менеджера</li>
        <li>Зберігайте всі Z-звіти</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">При помилках:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Не панікуйте</li>
        <li>Зробіть скріншот помилки</li>
        <li>Зверніться до менеджера або в підтримку</li>
        <li>Не намагайтеся виправити самостійно</li>
      </ol>
    `
  },
  {
    id: 'service',
    title: 'Стандарти обслуговування клієнтів',
    content: `
      <h3 class="font-bold mb-2">Привітання:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Посміхайтеся та дивіться в очі</li>
        <li>"Доброго дня! Вітаємо в Галя Балувана!"</li>
        <li>Запитайте: "Чим можу допомогти?"</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">Під час обслуговування:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Уважно слухайте клієнта</li>
        <li>Пропонуйте додаткові товари</li>
        <li>Розповідайте про акції</li>
        <li>Будьте ввічливими та терплячими</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">Прощання:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>"Дякуємо за покупку!"</li>
        <li>"Гарного дня!"</li>
        <li>Посміхніться на прощання</li>
      </ul>
    `
  },
  {
    id: 'conflicts',
    title: 'Дії при конфліктних ситуаціях',
    content: `
      <h3 class="font-bold mb-2">Алгоритм дій:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Зберігайте спокій і ввічливість</li>
        <li>Вислухайте клієнта до кінця</li>
        <li>Вибачтеся за незручності</li>
        <li>Запропонуйте рішення проблеми</li>
        <li>Якщо не можете вирішити - викличте менеджера</li>
      </ol>
      
      <h3 class="font-bold mt-4 mb-2">Що НЕ можна робити:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Підвищувати голос</li>
        <li>Сперечатися з клієнтом</li>
        <li>Звинувачувати клієнта</li>
        <li>Ігнорувати скарги</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">Фрази-помічники:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>"Я розумію ваше невдоволення"</li>
        <li>"Давайте разом знайдемо рішення"</li>
        <li>"Я обов'язково передам це керівництву"</li>
      </ul>
    `
  },
  {
    id: 'returns',
    title: 'Повернення товару',
    content: `
      <h3 class="font-bold mb-2">Умови повернення:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Товар належної якості - протягом 14 днів</li>
        <li>Товар неналежної якості - протягом гарантійного терміну</li>
        <li>Обов'язкова наявність чека</li>
        <li>Товар не повинен бути використаним</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">Алгоритм прийому повернення:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Перевірте чек та термін придбання</li>
        <li>Оцініть стан товару</li>
        <li>Заповніть заяву на повернення</li>
        <li>Оформіть повернення в Poster</li>
        <li>Поверніть кошти клієнту</li>
      </ol>
    `
  },
  {
    id: 'merchandising',
    title: 'Правила мерчандайзингу',
    content: `
      <h3 class="font-bold mb-2">Основні принципи:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Товари на рівні очей продаються краще</li>
        <li>Більш дорогі товари - на рівні очей</li>
        <li>Яскраві кольори привертають увагу</li>
        <li>Підтримуйте порядок на полицях</li>
      </ul>
      
      <h3 class="font-bold mt-4 mb-2">Правила викладки:</h3>
      <ol class="list-decimal ml-4 space-y-2">
        <li>Однакові товари разом</li>
        <li>Цінники завжди видимі</li>
        <li>Перевіряйте терміни придатності</li>
        <li>Старіший товар виставляйте вперед</li>
        <li>Підтримуйте повноту викладки</li>
      </ol>
      
      <h3 class="font-bold mt-4 mb-2">Акційні товари:</h3>
      <ul class="list-disc ml-4 space-y-2">
        <li>Виставляйте на видних місцях</li>
        <li>Використовуйте яскраві цінники</li>
        <li>Інформуйте клієнтів про акції</li>
      </ul>
    `
  },
];

export const KnowledgeBase = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">База Знань</h2>
      <Accordion type="single" collapsible className="w-full">
        {knowledgeData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
