import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const products = [
  {
    id: 1,
    name: 'Крем для обличчя зволожуючий',
    category: 'Догляд за обличчям',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Сироватка для волосся',
    category: 'Догляд за волоссям',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Маска для обличчя очищуюча',
    category: 'Догляд за обличчям',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Лосьйон для тіла',
    category: 'Догляд за тілом',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Тонік для обличчя',
    category: 'Догляд за обличчям',
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Шампунь зволожуючий',
    category: 'Догляд за волоссям',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Скраб для тіла',
    category: 'Догляд за тілом',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Крем для рук живильний',
    category: 'Догляд за руками',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=400&h=400&fit=crop',
  },
];

export const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Наша Продукція</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <h3 className="font-semibold text-sm">{product.name}</h3>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-sm">
          {selectedProduct && (
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-muted-foreground mb-2">
                {selectedProduct.category}
              </p>
              <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
