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
    notes VARCHAR(999),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `hotel_system`.`meal_option` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    notes VARCHAR(999),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `hotel_system`.`reservation_policy` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    notes VARCHAR(999),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `hotel_system`.`smoking_room_option` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    notes VARCHAR(999),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE property (
    id int NOT NULL AUTO_INCREMENT,
    property_type_id int,
    property_name varchar(45),
    property_rating varchar(45),
    review_score float(16),
    meal_option_policy_id int,
    kitchen_available boolean,
    reservation_policy_id int,
    parking boolean,
    restaurant boolean,
    pets_allowed boolean,
    room_service boolean,
    front_desk boolean,
    fitness_center boolean,
    smoking_room_option_id int,
    airport_shuttle boolean,
    family_rooms boolean,
    spa_and_wellnes_center boolean,
    swimming_pool boolean,
    private_bathroom boolean,
    private_pool boolean,
    sea_view boolean,
    air_conditioning boolean,
    washing_machine boolean,
    distance_from_center float(12),
    description varchar(2000),
    PRIMARY KEY (id),
    FOREIGN KEY (property_type_id) REFERENCES property_type(id) ON DELETE RESTRICT,
    FOREIGN KEY (meal_option_policy_id) REFERENCES meal_option(id) ON DELETE RESTRICT,
    FOREIGN KEY (reservation_policy_id) REFERENCES reservation_policy(id) ON DELETE RESTRICT,
    FOREIGN KEY (smoking_room_option_id) REFERENCES smoking_room_option(id) ON DELETE RESTRICT,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE room (
    id int NOT NULL AUTO_INCREMENT,
    property_id int,
    room_name varchar(45),
    room_number int,
    floor_number int,
    meal_option_id int,
    kitchen_available boolean,
    reservation_policy_id int,
    pets_allowed boolean,
    smoking_room_option_id int,
    family_rooms boolean,
    private_bathroom boolean,
    sea_view boolean,
    air_conditioning boolean,
    washing_machine boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE RESTRICT,
    FOREIGN KEY (meal_option_id) REFERENCES meal_option(id) ON DELETE RESTRICT,
    FOREIGN KEY (reservation_policy_id) REFERENCES reservation_policy(id) ON DELETE RESTRICT,
    FOREIGN KEY (smoking_room_option_id) REFERENCES smoking_room_option(id) ON DELETE RESTRICT,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE admin (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(45),
    password varchar(128),
    PRIMARY KEY (id),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(45),
    surname varchar(45),
    email varchar(60),
    phone varchar(25),
    password varchar(128),
    PRIMARY KEY (id),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE booking (
    id int NOT NULL AUTO_INCREMENT,
    checkin DATE,
    checkout DATE,
    room_id int,
    user_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE session (
    id int NOT NULL AUTO_INCREMENT,
    hashed_token varchar(56),
    user_id int,
    admin_id int,
    start_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

```

Əsas səhifəyə qayıdın.

Ehtiyac olduqca opsiyalar əlavə edin.