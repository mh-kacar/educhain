import { useState } from 'react';
import { auth, signIn, signOut } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function Header() {
  const [user] = useAuthState(auth);
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <header className="border-b-4 border-black p-6 flex flex-col md:flex-row justify-between items-start md:items-end bg-white sticky top-0 z-50">
      <div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">EduChain</h1>
        <p className="text-sm font-mono mt-2 opacity-60 uppercase">Dağıtık Defter // Akademik Başarılar</p>
      </div>
      
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <div className="text-right hidden sm:block">
          <div className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1 mb-2 inline-block">
            Ağ: Ana-Okul-01
          </div>
          <div className="text-xl font-mono font-bold uppercase">
            {user ? user.displayName : 'Misafir Kullanıcı'}
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
              alt="Avatar" 
              className="w-12 h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
            <button 
              onClick={() => signOut()}
              className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            disabled={isSigningIn}
            onClick={async () => {
              setIsSigningIn(true);
              try {
                const result = await signIn();
                if (result.user.email !== 'mhaz1080@gmail.com') {
                  await signOut();
                  alert('Erişim Reddedildi: Yalnızca sistem sahibi cüzdan bağlayabilir.');
                }
              } catch (error: any) {
                if (error.code === 'auth/popup-blocked') {
                  alert('Lütfen tarayıcınızın pop-up engelleyicisini kapatın veya uygulamayı yeni sekmede açın.');
                } else if (error.code === 'auth/unauthorized-domain') {
                  alert('Bu alan adı Firebase üzerinde yetkilendirilmemiş. Lütfen yeni sekmede aç butonuna basarak deneyin.');
                } else if (error.code !== 'auth/popup-closed-by-user') {
                  console.error('Giriş Hatası:', error);
                  alert('Giriş yapılırken bir hata oluştu: ' + error.message);
                }
              } finally {
                setIsSigningIn(false);
              }
            }}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningIn ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {isSigningIn ? 'Bağlanıyor...' : 'Cüzdanı Bağla'}
          </button>
        )}
      </div>
    </header>
  );
}
