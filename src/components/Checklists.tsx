import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const checklistsData = [
  {
    id: 'opening',
    title: 'Відкриття магазину',
    items: [
      'Увімкнути світло та музику',
      'Перевірити чистоту торгового залу',
      'Відкрити касову зміну в Poster',
      'Перевірити роботу ПРРО',
      'Перевірити наявність розмінних грошей',
      'Підготувати пакувальні матеріали',
      'Перевірити товари на полицях',
      'Перевірити терміни придатності',
      'Поповнити викладку',
      'Підготувати робоче місце',
    ],
  },
  {
    id: 'closing',
    title: 'Закриття магазину',
    items: [
      'Закрити касову зміну в Poster',
      'Сформувати Z-звіт',
      'Порахувати готівку',
      'Підготувати інкасацію',
      'Прибрати торговий зал',
      'Перевірити холодильники',
      'Вимкнути обладнання',
      'Перевірити замки на дверях',
      'Увімкнути сигналізацію',
      'Вимкнути світло',
    ],
  },
  {
    id: 'sale',
    title: 'Оформлення продажу',
    items: [
      'Привітати клієнта',
      'Уважно вислухати побажання',
      'Запропонувати допомогу у виборі',
      'Розповісти про товар',
      'Запропонувати супутні товари',
      'Повідомити про акції',
      'Оформити покупку в Poster',
      'Видати фіскальний чек',
      'Акуратно запакувати товар',
      'Подякувати за покупку',
    ],
  },
];

export const Checklists = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckChange = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  if (!selectedChecklist) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Чек-листи</h2>
        <div className="space-y-3">
          {checklistsData.map((checklist) => (
            <Card
              key={checklist.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedChecklist(checklist.id)}
            >
              <h3 className="font-semibold">{checklist.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {checklist.items.length} пунктів
              </p>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentChecklist = checklistsData.find(c => c.id === selectedChecklist);
  if (!currentChecklist) return null;

  const completedCount = currentChecklist.items.filter(
    (_, idx) => checkedItems[`${selectedChecklist}-${idx}`]
  ).length;

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setSelectedChecklist(null)}
        className="mb-4"
      >
        ← Назад до списку
      </Button>

      <Card className="p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">{currentChecklist.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Виконано: {completedCount} з {currentChecklist.items.length}
          </p>
          <Button variant="outline" size="sm" onClick={resetChecklist}>
            Скинути
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {currentChecklist.items.map((item, idx) => {
          const itemId = `${selectedChecklist}-${idx}`;
          return (
            <Card key={idx} className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={itemId}
                  checked={checkedItems[itemId] || false}
                  onCheckedChange={() => handleCheckChange(itemId)}
                />
                <label
                  htmlFor={itemId}
                  className={`flex-1 cursor-pointer ${
                    checkedItems[itemId] ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {item}
                </label>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
