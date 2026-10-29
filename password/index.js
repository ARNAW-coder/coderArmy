import bcrypt from "bcrypt";
const password = "12345678";

async function Hashing(){
    const hass = await bcrypt.hash(password,10);
    console.log(hass);
}

Hashing();

// $2b$10$spRxEZbg9BYGd9xjJRswe.D7IakJlfbUYEojA4AcnezIESKQd8KKO
// $2b$10$Wum6E0yxyBmyBEoohfV/SOGIlYB3AXYM5CpNfI9S9iyttxpO3BB6G

const str = "D7IakJlfbUYEojA4AcnezIESKQd8KKO";
console.log(str.length);