import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'История шафрана: от древней Персии до наших дней',
    excerpt: 'Узнайте, как самая дорогая специя в мире путешествовала через века и континенты, покоряя сердца кулинаров и правителей.',
    image: 'https://images.unsplash.com/photo-1596040033229-a0b55ee2a6dc?w=800&auto=format&fit=crop',
    category: 'История',
    readTime: '8 мин',
    date: '15 ноября 2024'
  },
  {
    id: 2,
    title: 'Чайная церемония: искусство заваривания Пуэра',
    excerpt: 'Древняя китайская традиция заваривания чая Пуэр — это не просто процесс, а целая философия. Погрузимся в секреты мастеров.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop',
    category: 'Культура',
    readTime: '6 мин',
    date: '12 ноября 2024'
  },
  {
    id: 3,
    title: 'Кардамон: зелёное золото Индии',
    excerpt: 'От горных плантаций Кералы до вашей кухни — путь одной из самых ароматных специй мира.',
    image: 'https://images.unsplash.com/photo-1599909533554-f2504ab88e8e?w=800&auto=format&fit=crop',
    category: 'История',
    readTime: '7 мин',
    date: '8 ноября 2024'
  },
  {
    id: 4,
    title: '5 рецептов с корицей для осенних вечеров',
    excerpt: 'Согревающие и ароматные блюда с корицей, которые создадут уют в вашем доме.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop',
    category: 'Рецепты',
    readTime: '5 мин',
    date: '5 ноября 2024'
  },
  {
    id: 5,
    title: 'Звёздчатый анис: восточная звезда на вашей кухне',
    excerpt: 'Удивительная специя в форме звезды — от традиционного использования в азиатской кухне до современных экспериментов.',
    image: 'https://images.unsplash.com/photo-1599909533625-46bbf39df127?w=800&auto=format&fit=crop',
    category: 'Кулинария',
    readTime: '6 мин',
    date: '1 ноября 2024'
  },
  {
    id: 6,
    title: 'Как выбрать настоящий чай: гид для ценителей',
    excerpt: 'Научитесь отличать качественный чай от подделки и выбирать идеальный сорт для любого настроения.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop',
    category: 'Гид',
    readTime: '10 мин',
    date: '28 октября 2024'
  }
];

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
          <Button variant="outline" size="icon">
            <Icon name="ShoppingCart" size={20} />
          </Button>
        </div>
      </header>

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <Icon name="BookOpen" className="mx-auto mb-4 text-primary" size={64} />
          <h2 className="text-6xl font-heading font-bold mb-4">Блог</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Истории, традиции и секреты специй и чаёв со всего мира
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Все статьи' : category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Card
              key={post.id}
              className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer animate-scale-in"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4">{post.category}</Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Button variant="link" className="p-0">
                  Читать далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
