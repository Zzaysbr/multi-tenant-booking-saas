const axios = require('axios');

const BASE = "http://localhost:3000";

async function register(email, role) {
    try {
        await axios.post(`${BASE}/auth/register`, {
            email,
            password: '123456',
            role
        });
    } catch (err) {
        console.error(`Error registering user: ${err.response ? err.response.data : err.message}`);
    }
}


async function login(email) {
  try {
    const res = await axios.post(`${BASE}/auth/login`, {
      email,
      password: "123456",
    });

    console.log("login success", email);
    console.log(res.data);

    return res.data.accessToken;  // <<< ต้องมีบรรทัดนี้

  } catch (err) {
    console.error("login failed", email);
    console.error(err.response?.data);
    return null;
  }
}


async function createTenant(token, name) {
    const res = await axios.post(
        `${BASE}/tenants`, 
        { 
            name,
            timezone: 'Asia/Bangkok',
        }, 
        {
            headers: { Authorization: `Bearer ${token}`},
        }
    );
    return res.data;
}


async function getMine(token) {
    const res = await axios.get(
        `${BASE}/tenants/mine`, 
        {
            headers: { Authorization: `Bearer ${token}`},
        }
    );
    return res.data;
}

async function getAll(token) {
    const res = await axios.get(
        `${BASE}/tenants`, 
        {
            headers: { Authorization: `Bearer ${token}`},
        }
    );
    return res.data;
}

async function run() {
  console.log("==Register Users==");

  await register("ownerA@mail.com", "owner");
  await register("ownerB@mail.com", "owner");
  await register("admin@mail.com", "admin");

  const ownerAToken = await login("ownerA@mail.com");
  const ownerBToken = await login("ownerB@mail.com");
  const adminToken = await login("admin@mail.com");

  console.log("Tokens:");
  console.log(ownerAToken);
  console.log(ownerBToken);
  console.log(adminToken);

  if (!ownerAToken || !ownerBToken || !adminToken) {
    console.log("Token missing, abort.");
    return;
  }

  console.log("==Create Tenants==");

  await createTenant(ownerAToken, "Salon A1");
  await createTenant(ownerAToken, "Salon A2");
  await createTenant(ownerBToken, "Salon B1");

  console.log("==Owner A Mine==");
  console.log(await getMine(ownerAToken));

  console.log("==Owner B Mine==");
  console.log(await getMine(ownerBToken));

  console.log("==Admin All==");
  console.log(await getAll(adminToken));
}

run();
