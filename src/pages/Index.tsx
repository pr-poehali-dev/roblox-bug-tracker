import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const games = [
  { id: 'rivas', name: 'RIVAS', icon: 'Zap' },
  { id: 'garden', name: 'GROW A GARDEN', icon: 'Flower2' },
  { id: 'adopt', name: 'ADOPT ME', icon: 'Heart' },
  { id: 'brainrot', name: 'STEAL A BRAINROT', icon: 'Brain' },
  { id: 'nights', name: '99 NIGHT', icon: 'Moon' },
];

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editableContent, setEditableContent] = useState<{ [key: string]: string }>({
    rivas: 'Найдены критические баги в системе боя. Возможность дюпа оружия через задержку сервера.',
    garden: 'Обнаружен эксплойт безграничного роста растений. Используйте команду /water в точное время.',
    adopt: 'Баг бесконечных питомцев! Быстрое переключение инвентаря позволяет клонировать легендарных питомцев.',
    brainrot: 'Glitch позволяет украсть все предметы противника через стену. Координаты: X:420, Y:69.',
    nights: 'Найден способ пропустить все 99 ночей за 5 минут. Секретная комбинация клавиш в главном меню.',
  });

  const handleAdminAccess = () => {
    if (adminPassword === '3258') {
      setIsAdmin(true);
      setShowAdminDialog(false);
      setAdminPassword('');
    } else {
      alert('Неверный код доступа');
      setAdminPassword('');
    }
  };

  const handleContentChange = (gameId: string, newContent: string) => {
    setEditableContent({ ...editableContent, [gameId]: newContent });
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-primary neon-glow glitch mb-4">
            ROBLOX GLITCHES
          </h1>
          <p className="text-xl text-muted-foreground font-mono">
            {'>'} СЕКРЕТНЫЕ БАГИ И ЭКСПЛОЙТЫ {'<'}
          </p>
        </header>

        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {games.map((game) => (
              <Card
                key={game.id}
                className="group cursor-pointer bg-card border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105 neon-border p-8 relative overflow-hidden"
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name={game.icon as any} size={40} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-center text-primary neon-glow">
                    {game.name}
                  </h2>
                  <div className="text-accent font-mono text-sm">{'> ВОЙТИ <'}</div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedGame(null)}
              className="mb-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              НАЗАД В МЕНЮ
            </Button>

            <Card className="bg-card border-2 border-primary neon-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon 
                    name={games.find(g => g.id === selectedGame)?.icon as any} 
                    size={32} 
                    className="text-primary" 
                  />
                </div>
                <h2 className="text-4xl font-bold text-primary neon-glow">
                  {games.find(g => g.id === selectedGame)?.name}
                </h2>
              </div>

              <div className="bg-muted/50 border border-primary/30 rounded-lg p-6 font-mono">
                {isAdmin ? (
                  <Textarea
                    value={editableContent[selectedGame]}
                    onChange={(e) => handleContentChange(selectedGame, e.target.value)}
                    className="min-h-[200px] bg-background border-primary/50 text-foreground"
                  />
                ) : (
                  <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {editableContent[selectedGame]}
                  </p>
                )}
              </div>

              {isAdmin && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => setIsAdmin(false)}
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    ВЫЙТИ ИЗ РЕЖИМА РЕДАКТИРОВАНИЯ
                  </Button>
                </div>
              )}

              <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-secondary mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2">ВНИМАНИЕ!</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      Использование багов может привести к блокировке аккаунта. 
                      Администрация Roblox активно банит за эксплойты.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowAdminDialog(true)}
        className="fixed bottom-6 left-6 w-3 h-3 rounded-full bg-muted/30 hover:bg-primary/50 transition-all duration-300 hover:w-12 hover:h-12 z-50 opacity-30 hover:opacity-100"
        aria-label="Admin access"
      />

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary neon-glow">
              ДОСТУП АДМИНИСТРАТОРА
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                {'>'} ВВЕДИТЕ КОД ДОСТУПА
              </label>
              <Input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
                placeholder="****"
                className="bg-background border-primary/50 font-mono text-lg tracking-widest"
              />
            </div>
            <Button
              onClick={handleAdminAccess}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              ВОЙТИ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;