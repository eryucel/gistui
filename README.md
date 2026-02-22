# Gist UI 🚀

GitHub Gist'lerinizi lokalde yönetebileceğiniz basit ve modern bir web uygulaması.

## ✨ Özellikler

- 📋 Tüm gist'lerinizi tek sayfada görüntüleyin
- 🗑️ Seçtiğiniz gist'leri toplu olarak silin
- 🔒 Token bilgilerinizi tarayıcıda saklayın (localStorage)
- 🌐 GitHub API ile direkt iletişim (backend yok)
- 📱 Responsive tasarım
- 🎨 Modern ve basit arayüz

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stylng
- **GitHub REST API** - Gist işlemleri

## 📦 Kurulum

### Gereksinimler

- Node.js 18 veya üzeri

### Adımlar

```bash
# Repoyu klonlayın
git clone https://github.com/kullanici-adi/gistui.git
cd gistui

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

## 🔑 GitHub Token Oluşturma

1. [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens/new) sayfasına gidin
2. Generate new token (classic) seçeneğini seçin
3. Token'a bir isim verin (örn: "Gist UI")
4. **Gist** iznini seçin (diğer izinlere gerek yok)
5. Generate token butonuna tıklayın
6. Oluşturulan token'ı kopyalayın

## 🚀 Kullanım

1. Uygulamayı açtığınızda GitHub Personal Access Token'ınızı girin
2. **Save** butonuna tıklayarak token'ı kaydedin (localStorage'a kaydedilir)
3. **Fetch Gists** butonuna tıklayarak tüm gist'lerinizi çekin
4. Silmek istediğiniz gist'leri seçin (checkbox ile)
5. **Delete Selected** butonuna tıklayarak seçili gist'leri silin

### Kontrol Butonları

- **Select All** - Tüm gist'leri seç
- **Clear Selection** - Seçimi temizle
- **Delete Selected (X)** - Seçili gist'leri sil

## ⚠️ Güvenlik Notları

- Token bilgilerinizz **localStorage**'da saklanır ve sadece tarayıcınızda kalır
- Token asla sunucuya gönderilmez (backend yok, tamamen client-side)
- Token'ınızı paylaşmayın veya public repo'lara commit etmeyin
- LocalStorage tarayıcıda kalıcıdır, ancak tarayıcı verilerini temizlerseniz silinir

## 📸 Ekran Görüntüleri

*(Ekran görüntüleri yakında eklenecek)*

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyorum! Lütfen issue açın veya PR gönderin.

## 📝 Lisans

MIT

## 🔗 Linkler

- [GitHub Gists API Documentation](https://docs.github.com/en/rest/gists/gists)
