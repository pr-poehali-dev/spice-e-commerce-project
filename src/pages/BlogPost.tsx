import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const blogContent = {
  1: {
    title: 'История шафрана: от древней Персии до наших дней',
    image: 'https://images.unsplash.com/photo-1596040033229-a0b55ee2a6dc?w=1200&auto=format&fit=crop',
    category: 'История',
    date: '15 ноября 2024',
    readTime: '8 мин',
    content: [
      {
        subtitle: 'Происхождение легенды',
        text: 'Шафран — это не просто специя, это легенда, воплощённая в тонких красных нитях. История шафрана уходит корнями в древнюю Персию, где его впервые начали культивировать более 3000 лет назад. Персидские правители ценили шафран на вес золота, используя его не только в кулинарии, но и в медицине, косметике и даже для окрашивания королевских одежд.'
      },
      {
        subtitle: 'Путешествие через века',
        text: 'С караванами по Великому шёлковому пути шафран распространился по всему миру. Он покорил Грецию, где стал символом богатства и роскоши. Римляне усыпали шафраном улицы перед триумфальными шествиями. В Средневековье европейские монархи платили за шафран баснословные суммы, а его подделка каралась смертной казнью.'
      },
      {
        subtitle: 'Современное производство',
        text: 'Сегодня 90% мирового шафрана производится в Иране, где древние традиции выращивания передаются из поколения в поколение. Каждый цветок крокуса даёт всего три красные нити, и для получения одного килограмма шафрана требуется собрать вручную около 150 000 цветков. Это объясняет, почему шафран остаётся самой дорогой специей в мире.'
      },
      {
        subtitle: 'Ценность и применение',
        text: 'В кулинарии шафран ценится за уникальный аромат, золотистый цвет и тонкий вкус с медовыми нотками. Он незаменим в классических блюдах — от персидского плова и испанской паэльи до итальянского ризотто. В современной гастрономии шафран используют даже в десертах и коктейлях, открывая новые грани этой древней специи.'
      }
    ]
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogContent[Number(id) as keyof typeof blogContent];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Статья не найдена</h2>
          <Button onClick={() => navigate('/blog')}>Вернуться к блогу</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/blog')}>
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

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Clock" size={18} />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="relative h-[500px] rounded-lg overflow-hidden mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">
                {section.subtitle}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <Card className="p-8 bg-muted/30">
          <div className="flex items-center gap-6">
            <Icon name="BookOpen" className="text-primary" size={64} />
            <div>
              <h3 className="text-2xl font-heading font-bold mb-2">
                Понравилась статья?
              </h3>
              <p className="text-muted-foreground mb-4">
                Подпишитесь на нашу рассылку, чтобы получать новые истории о специях и чаях
              </p>
              <Button>
                <Icon name="Mail" size={18} className="mr-2" />
                Подписаться
              </Button>
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
}
