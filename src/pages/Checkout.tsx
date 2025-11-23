import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Шафран Premium',
    price: 2500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1596040033229-a0b55ee2a6dc?w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Кардамон зелёный',
    price: 890,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1599909533554-f2504ab88e8e?w=200&auto=format&fit=crop'
  }
];

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === 'courier' ? (subtotal >= 3000 ? 0 : 350) : 250;
  const total = subtotal + deliveryCost;

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={32} />
              <h1 className="text-3xl font-heading font-bold text-primary">Вкус Востока</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-heading font-bold mb-8">Оформление заказа</h2>

        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 max-w-2xl w-full">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-heading font-bold ${
                  step >= num ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-muted'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    step > num ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <Card className="p-8 animate-fade-in">
                <h3 className="text-2xl font-heading font-bold mb-6">Контактные данные</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input id="firstName" placeholder="Иван" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input id="lastName" placeholder="Петров" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea id="comment" placeholder="Укажите удобное время доставки или другие пожелания" />
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-8 animate-fade-in">
                <h3 className="text-2xl font-heading font-bold mb-6">Способ доставки</h3>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="space-y-4">
                    <Label
                      htmlFor="courier"
                      className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="courier" id="courier" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Truck" size={20} className="text-primary" />
                            <span className="font-semibold">Курьерская доставка</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Доставка в течение 1-2 дней
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        {subtotal >= 3000 ? 'Бесплатно' : '350 ₽'}
                      </span>
                    </Label>

                    <Label
                      htmlFor="pickup"
                      className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="MapPin" size={20} className="text-primary" />
                            <span className="font-semibold">Пункт выдачи</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Более 1000 пунктов по России
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">250 ₽</span>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryMethod === 'courier' && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <h4 className="font-heading font-semibold text-lg">Адрес доставки</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="city">Город *</Label>
                        <Input id="city" placeholder="Москва" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Улица и дом *</Label>
                        <Input id="address" placeholder="ул. Ленина, д. 10" />
                      </div>
                      <div>
                        <Label htmlFor="apartment">Квартира</Label>
                        <Input id="apartment" placeholder="25" />
                      </div>
                      <div>
                        <Label htmlFor="entrance">Подъезд</Label>
                        <Input id="entrance" placeholder="2" />
                      </div>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'pickup' && (
                  <div className="mt-6 animate-fade-in">
                    <h4 className="font-heading font-semibold text-lg mb-4">Выберите пункт выдачи</h4>
                    <Input placeholder="Введите адрес или название пункта выдачи" />
                    <p className="text-sm text-muted-foreground mt-2">
                      После оформления заказа вы получите список ближайших пунктов выдачи
                    </p>
                  </div>
                )}
              </Card>
            )}

            {step === 3 && (
              <Card className="p-8 animate-fade-in">
                <h3 className="text-2xl font-heading font-bold mb-6">Способ оплаты</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="card" id="card" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="CreditCard" size={20} className="text-primary" />
                            <span className="font-semibold">Банковская карта</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Visa, MasterCard, МИР
                          </p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="cash"
                      className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="cash" id="cash" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Wallet" size={20} className="text-primary" />
                            <span className="font-semibold">При получении</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Наличными или картой курьеру
                          </p>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="sbp"
                      className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Smartphone" size={20} className="text-primary" />
                            <span className="font-semibold">СБП (Система быстрых платежей)</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Оплата через мобильный банк
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <Button variant="outline" size="lg" onClick={handlePrevStep} className="flex-1">
                  <Icon name="ChevronLeft" size={18} className="mr-2" />
                  Назад
                </Button>
              )}
              {step < 3 ? (
                <Button size="lg" onClick={handleNextStep} className="flex-1">
                  Далее
                  <Icon name="ChevronRight" size={18} className="ml-2" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleSubmit} className="flex-1">
                  Оформить заказ
                  <Icon name="Check" size={18} className="ml-2" />
                </Button>
              )}
            </div>
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-heading font-bold mb-4">Ваш заказ</h3>
              <div className="space-y-4 mb-6">
                {mockCartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <span className="font-semibold">{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары:</span>
                  <span>{subtotal} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-xl font-heading font-bold">Итого:</span>
                <span className="text-2xl font-heading font-bold text-primary">{total} ₽</span>
              </div>

              {subtotal < 3000 && deliveryMethod === 'courier' && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Добавьте товаров на {3000 - subtotal} ₽ для бесплатной доставки
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
