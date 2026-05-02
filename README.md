Scholastic Chain ⛓️🎓
Scholastic Chain, öğrencilerin akademik başarılarını, yarışma katılımlarını ve proje detaylarını blok zinciri (blockchain) mimarisiyle kaydeden, değiştirilemez ve şeffaf bir dijital arşiv sistemidir.

🚀 Proje Hakkında
Bu sistem, merkeziyetsiz bir defter mantığıyla çalışır. Klasik veritabanı yapılarının aksine, her katılım kaydı bir "blok" içerisinde hashlenerek saklanır. Firebase Firestore üzerinde kurgulanan katı güvenlik kuralları sayesinde, bir kayıt oluşturulduktan sonra üzerinde güncelleme veya silme işlemi yapılamaz; bu da akademik geçmişin doğruluğunu ve değişmezliğini (immutability) garanti altına alır.

Temel Özellikler
Blok Zinciri Mimarisi: Her blok; indeks, zaman damgası, katılım verileri ve bir önceki bloğun hash bilgisini içerir.

Değişmezlik (Immutability): firestore.rules ile update ve delete işlemleri teknik olarak engellenmiştir.

Rol Tabanlı Erişim: Admin yetkisi sadece doğrulanmış e-posta (mhaz1080@gmail.com) adresiyle sınırlandırılmıştır.

Veri Bütünlüğü: SHA-256 hash algoritması kullanılarak blokların kurcalanması imkansız hale getirilmiştir.

🛠️ Teknoloji Yığını
Frontend: React 19, Vite, Tailwind CSS.

Backend/Database: Firebase Firestore.

Kriptografi: js-sha256 (Hashleme işlemleri için).

Yapay Zeka: Google Generative AI (@google/genai).

📋 Veri Yapısı
Sistem üç temel yapı üzerine kurulmuştur:

Student: Öğrenci kimlik bilgileri ve sınıf seviyeleri.

Project: Yarışma, seminer veya proje meta verileri.

Block: Katılım kayıtlarını (ParticipationRecord) içeren ve birbirine hash ile bağlanan zincir halkaları.

🔧 Kurulum
Projeyi yerel ortamınızda çalıştırmak için:

Bağımlılıkları Yükleyin:

Bash
npm install
Çevresel Değişkenleri Ayarlayın:
Proje ana dizininde bir .env dosyası oluşturun ve firebase-applet-config.json dosyasındaki bilgileri buraya aktarın.

Geliştirme Sunucusunu Başlatın:

Bash
npm run dev
🔒 Güvenlik Kuralları
Proje, verilerin manipüle edilmesini engellemek için özelleştirilmiş güvenlik kurallarına sahiptir. security_spec.md dosyasında tanımlanan 12 temel güvenlik test senaryosu (Dirty Dozen Payloads) uygulanmıştır.

Public Ledger: Blok zinciri verileri herkes tarafından okunabilir, ancak sadece yetkili adminler yeni kayıt ekleyebilir.

Audit Trail: Öğrenci ve proje kayıtları silinemez, bu da bir denetim izi (audit trail) oluşturur.
