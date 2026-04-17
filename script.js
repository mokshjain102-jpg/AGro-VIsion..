/* FULL RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BODY FIX */
body {
  font-family: 'Poppins', sans-serif;
  background: #0f2027;
  color: white;
  overflow-x: hidden;
}

/* REMOVE WHITE SIDE SPACE */
html, body {
  width: 100%;
}

/* NAV */
.nav {
  width: 100%;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  background: rgba(0,0,0,0.7);
  position: fixed;
  top: 0;
  z-index: 1000;
}

/* HERO FULL WIDTH */
.hero {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),
  url('https://images.unsplash.com/photo-1500382017468-9049fed747ef') center/cover no-repeat;
  display: flex;
  align-items: center;
  padding-left: 60px;
}

/* HERO TEXT */
.hero h1 {
  font-size: 90px;
}

/* STATS FIX */
.stats {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: rgba(0,0,0,0.8);
  padding: 20px;
  font-weight: bold;
}

/* DASHBOARD */
.dashboard {
  padding: 60px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
}

/* CARDS FIX */
.card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 20px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 20px #00ffcc;
}

/* BIG CARD */
.large {
  grid-column: span 2;
}

/* UPLOAD BOX */
.upload {
  border: 2px dashed #00ffcc;
  padding: 25px;
  text-align: center;
  border-radius: 10px;
}

/* FEATURES */
.features {
  padding: 60px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
}

/* REMOVE WHITE FROM BOTTOM */
.bottom {
  background: rgba(0,0,0,0.8);
  display: flex;
  gap: 20px;
  padding: 40px;
}
