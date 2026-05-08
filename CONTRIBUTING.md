# Panduan Kontribusi

Terima kasih telah meluangkan waktu untuk berkontribusi pada proyek ini. Dokumen ini menjelaskan semua yang perlu Anda ketahui sebelum mulai berkontribusi, mulai dari standar kode hingga alur kerja pull request dan etika komunikasi.

---

## Daftar Isi

- [Kode Etik](#kode-etik)
- [Cara Memulai](#cara-memulai)
- [Alur Kerja Kontribusi](#alur-kerja-kontribusi)
- [Aturan Pull Request](#aturan-pull-request)
- [Standar Penulisan Kode](#standar-penulisan-kode)
- [Konvensi Pesan Commit](#konvensi-pesan-commit)
- [Melaporkan Bug](#melaporkan-bug)
- [Mengusulkan Fitur Baru](#mengusulkan-fitur-baru)

---

## Kode Etik

Proyek ini menganut prinsip kolaborasi yang terbuka dan saling menghormati. Semua kontributor diharapkan untuk:

- Menggunakan bahasa yang sopan dan inklusif dalam setiap diskusi, baik di issue, pull request, maupun komentar kode.
- Menerima kritik dan masukan secara konstruktif. Kritik ditujukan pada kode, bukan pada orangnya.
- Menghargai perbedaan pendapat dan pengalaman. Tidak ada satu cara yang selalu benar.
- Tidak melakukan serangan pribadi, pelecehan, atau diskriminasi dalam bentuk apapun.
- Bersedia membantu kontributor baru yang masih belajar.

Pelanggaran terhadap kode etik ini dapat mengakibatkan kontribusi ditolak atau akses ke proyek dicabut.

---

## Cara Memulai

1. Fork repository ini ke akun GitHub Anda.
2. Clone hasil fork ke mesin lokal Anda:
   ```bash
   git clone https://github.com/<username-anda>/<nama-repo>.git
   ```
3. Ikuti langkah instalasi di [README.md](./README.md) untuk menyiapkan environment lokal.
4. Buat branch baru dari `main` sebelum mulai mengerjakan perubahan apapun.

---

## Alur Kerja Kontribusi

Gunakan alur kerja berikut untuk setiap kontribusi:

```
main
 └── feature/nama-fitur       (fitur baru)
 └── fix/nama-bug             (perbaikan bug)
 └── docs/nama-perubahan      (perubahan dokumentasi)
 └── refactor/nama-bagian     (refaktor kode tanpa mengubah perilaku)
```

Langkah-langkah:

1. Pastikan branch `main` lokal Anda sudah sinkron dengan repository utama:
   ```bash
   git checkout main
   git pull upstream main
   ```
2. Buat branch baru dengan nama yang deskriptif:
   ```bash
   git checkout -b feature/generate-mindmap
   ```
3. Kerjakan perubahan Anda dengan commit yang kecil dan terfokus.
4. Push branch ke fork Anda:
   ```bash
   git push origin feature/generate-mindmap
   ```
5. Buka Pull Request ke branch `main` di repository utama.

---

## Aturan Pull Request

### Sebelum Membuka PR

- Pastikan kode Anda sudah berjalan dan tidak merusak fungsionalitas yang ada.
- Jalankan linter sebelum push:
  ```bash
  # Frontend
  cd frontend/ai-learnig-asistent
  npm run lint
  ```
- Satu PR sebaiknya hanya menyelesaikan satu hal (satu fitur, satu bug, atau satu refaktor). Hindari PR yang terlalu besar dan mencampur banyak perubahan tidak berkaitan.
- Hapus kode yang dikomentari (`// kode lama`) sebelum membuka PR, kecuali komentar tersebut memang diperlukan sebagai penjelasan.

### Judul PR

Gunakan format berikut:

```
[Tipe] Deskripsi singkat dalam bahasa Inggris
```

Contoh yang baik:
```
[feat] Add mindmap generation from document
[fix] Resolve flashcard delete not working
[docs] Update API endpoints in README
[refactor] Simplify PDF chunking logic
```

Tipe yang tersedia: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`.

### Deskripsi PR

Setiap PR wajib menyertakan deskripsi yang mencakup:

- **Apa yang diubah**: Penjelasan singkat tentang perubahan yang dilakukan.
- **Mengapa diubah**: Alasan atau konteks di balik perubahan tersebut.
- **Cara menguji**: Langkah-langkah untuk memverifikasi bahwa perubahan bekerja dengan benar.
- **Screenshot** (jika ada perubahan UI).

Contoh template deskripsi PR:

```markdown
## Apa yang diubah
Menambahkan endpoint baru untuk generate mindmap dari teks dokumen.

## Mengapa
Fitur ini diminta di issue #42 untuk membantu pengguna memvisualisasikan struktur materi.

## Cara menguji
1. Upload dokumen PDF
2. Buka halaman detail dokumen
3. Klik tombol "Generate Mindmap"
4. Verifikasi mindmap tampil dengan benar
```

### Proses Review

- Setiap PR memerlukan minimal satu approval dari maintainer sebelum dapat di-merge.
- Reviewer berhak meminta perubahan. Tanggapi setiap komentar review dengan sopan dan segera.
- Jika tidak setuju dengan masukan reviewer, sampaikan alasan teknis Anda dengan jelas, bukan dengan emosi.
- Setelah semua komentar diselesaikan, minta reviewer untuk melakukan re-review.
- PR yang tidak ada aktivitas selama lebih dari 14 hari dapat ditutup oleh maintainer.

---

## Standar Penulisan Kode

Standar berikut mencerminkan konvensi yang sudah diterapkan di seluruh codebase proyek ini.

### Umum

- Gunakan **ES Modules** (`import`/`export`) di seluruh proyek, baik backend maupun frontend. Jangan gunakan `require()`.
- Gunakan `const` untuk nilai yang tidak berubah, dan `let` jika nilai perlu diubah. Hindari `var`.
- Selalu gunakan `async/await` untuk operasi asinkron. Hindari `.then().catch()` berantai.
- Setiap fungsi async di controller wajib dibungkus dengan `try/catch` dan meneruskan error ke `next(error)`.

### Backend (Node.js / Express)

**Penamaan:**
- File controller: `namaFiturCrontroller.js` (ikuti konvensi yang sudah ada)
- File route: `namaFiturRoutes.js`
- File model: `NamaModel.js` (PascalCase)
- Nama fungsi dan variabel: `camelCase`
- Nama konstanta environment: `UPPER_SNAKE_CASE`

**Struktur Controller:**

Setiap fungsi controller wajib menyertakan komentar JSDoc singkat di atasnya:

```javascript
// @desc   Deskripsi singkat fungsi ini
// @route  METHOD /api/path
// @access Public | Private

export const namaFungsi = async (req, res, next) => {
  try {
    // validasi input terlebih dahulu
    if (!req.body.field) {
      return res.status(400).json({
        success: false,
        error: "Pesan error yang jelas",
        statusCode: 400,
      });
    }

    // logika utama

    res.status(200).json({
      success: true,
      data: hasil,
      message: "Pesan sukses",
    });
  } catch (error) {
    next(error);
  }
};
```

**Format Respons API:**

Selalu gunakan format respons yang konsisten di seluruh endpoint:

```javascript
// Sukses
{
  "success": true,
  "data": { ... },
  "message": "Deskripsi singkat"
}

// Error
{
  "success": false,
  "error": "Pesan error yang dapat dibaca pengguna",
  "statusCode": 400
}
```

**Model Mongoose:**

- Definisikan schema dengan validasi dan pesan error yang jelas.
- Gunakan opsi `{ timestamps: true }` pada setiap schema.
- Field yang sensitif (seperti `password`) wajib menggunakan `select: false`.

```javascript
const contohSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: [true, "Pesan error jika field kosong"],
      trim: true,
    },
  },
  { timestamps: true },
);
```

**Route:**

- Kelompokkan semua route yang memerlukan autentikasi dengan `router.use(protect)` di bagian atas, bukan per-route.
- Urutkan route dari yang paling spesifik ke yang paling umum untuk menghindari konflik parameter.

```javascript
router.use(protect);

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getDocuments);
router.get("/:id", getDocument);
router.delete("/:id", deleteDocument);
```

### Frontend (React / JSX)

**Penamaan:**
- File komponen: `NamaKomponen.jsx` (PascalCase)
- File halaman: `NamaHalamanPage.jsx` (PascalCase, akhiran `Page`)
- File service: `namaFiturService.js` (camelCase)
- Nama komponen React: `PascalCase`
- Nama fungsi, variabel, dan state: `camelCase`
- Nama custom hook: diawali dengan `use`, contoh: `useAuth`

**Struktur Komponen:**

Gunakan functional component dengan urutan penulisan yang konsisten:

```jsx
import React, { useState, useEffect } from "react";
// import library eksternal
// import komponen internal
// import service / context

const NamaKomponen = ({ prop1, prop2 = "defaultValue" }) => {
  // 1. hooks (useState, useEffect, custom hooks)
  const [state, setState] = useState(null);

  // 2. derived values / computed

  // 3. handler functions
  const handleAksi = () => { ... };

  // 4. useEffect
  useEffect(() => { ... }, []);

  // 5. conditional rendering (loading, error, empty state)
  if (loading) return <Spinner />;

  // 6. return JSX utama
  return (
    <div>...</div>
  );
};

export default NamaKomponen;
```

**Props:**

- Selalu definisikan nilai default untuk props opsional langsung di parameter fungsi.
- Jangan melempar error jika props opsional tidak diberikan.

**Styling:**

- Gunakan Tailwind CSS untuk semua styling. Hindari inline style (`style={{ }}`) kecuali untuk nilai dinamis yang tidak bisa dicapai dengan Tailwind.
- Untuk kelas yang bersyarat, gunakan array dan `.join(" ")` seperti yang sudah diterapkan di komponen `Button`:
  ```jsx
  className={[baseStyles, variantStyles[variant], sizeStyles[size], className].join(" ")}
  ```

**State Management:**

- Gunakan React Context (`AuthContext`) untuk state global yang berkaitan dengan autentikasi.
- Untuk state lokal komponen, gunakan `useState`.
- Hindari prop drilling lebih dari dua level. Pertimbangkan Context jika data perlu diakses di banyak tempat.

**Pemanggilan API:**

- Semua pemanggilan API harus melalui fungsi di folder `services/`, bukan langsung dari komponen.
- Selalu tangani state loading dan error saat memanggil API.
- Gunakan `react-hot-toast` untuk menampilkan notifikasi sukses dan error kepada pengguna.

```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    const result = await namaService.namaFungsi(data);
    toast.success("Berhasil!");
  } catch (error) {
    toast.error(error.message || "Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};
```

---

## Konvensi Pesan Commit

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipe>(<scope>): <deskripsi singkat>
```

Tipe yang digunakan:

| Tipe | Kapan digunakan |
|---|---|
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Perubahan dokumentasi saja |
| `style` | Perubahan formatting, tidak ada perubahan logika |
| `refactor` | Refaktor kode tanpa menambah fitur atau memperbaiki bug |
| `chore` | Update dependency, konfigurasi build, dll. |

Contoh pesan commit yang baik:

```
feat(ai): add concept explanation endpoint
fix(auth): handle expired token error correctly
docs(readme): add API endpoints table
refactor(flashcard): simplify review count logic
chore(deps): update mongoose to 9.3.0
```

Aturan tambahan:
- Gunakan bahasa Inggris untuk pesan commit.
- Gunakan kalimat imperatif: "add feature" bukan "added feature" atau "adds feature".
- Jangan akhiri baris pertama dengan tanda titik.
- Batasi baris pertama maksimal 72 karakter.

---

## Melaporkan Bug

Sebelum membuka issue baru, pastikan bug yang sama belum pernah dilaporkan sebelumnya.

Saat melaporkan bug, sertakan informasi berikut:

- **Deskripsi bug**: Apa yang terjadi dan apa yang seharusnya terjadi.
- **Langkah reproduksi**: Langkah-langkah detail untuk mereproduksi bug tersebut.
- **Environment**: Versi Node.js, browser, dan sistem operasi yang digunakan.
- **Screenshot atau log error** (jika ada).

---

## Mengusulkan Fitur Baru

Buka issue baru dengan label `enhancement` dan sertakan:

- **Deskripsi fitur**: Apa yang ingin ditambahkan dan mengapa fitur ini berguna.
- **Solusi yang diusulkan**: Gambaran teknis bagaimana fitur ini bisa diimplementasikan.
- **Alternatif yang dipertimbangkan**: Pendekatan lain yang sudah Anda pikirkan.

Diskusikan ide Anda di issue terlebih dahulu sebelum mulai mengerjakan implementasinya. Ini menghindari situasi di mana Anda sudah menghabiskan banyak waktu pada sesuatu yang mungkin tidak akan di-merge.
