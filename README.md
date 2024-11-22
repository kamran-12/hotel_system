# Otel idarəetmə sistemi

## İstifadəsi

Node.js və MySQL quraşdırın.

Layihəni yükləyin.

Aşağıdakıları tamamlayaraq layihənin qovluğunda .env faylına yerləşdirin:

```
NUXT_MYSQL_HOST=
NUXT_MYSQL_USER=
NUXT_MYSQL_DATABASE=
NUXT_MYSQL_PASSWORD=
```

Layihənin qovluğunda `npm install` edin.

Layihənin qovluğunda `npm run dev` edin.

http://localhost:3000/ ünvanını açın.

"Fərdi sorğu" səhifəsinə keçib ordakı mətn sahəsinə bu kodu daxil edib "Göndər" seçin:

```
CREATE TABLE `hotel_system`.`property_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);
```

Əsas səhifəyə qayıdıb "Əmlak tipləri" seçib istifadə edin.