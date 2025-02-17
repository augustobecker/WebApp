<template>
  <nav class="navbar">

    <div class="navbar-toggle" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>


    <ul class="navbar-menu" :class="{ active: isMenuActive }">
      <li v-for="(item, index) in menuItems" :key="index" class="navbar-item">

        <div @click="toggleSubmenu(index)" class="navbar-link-wrapper">
          <a href="#" class="navbar-link">
            {{ item.title }}
            <span v-if="item.subitems.length" class="arrow" :class="{ 'rotate': item.isOpen }">▼</span>
          </a>
        </div>

        <ul v-if="item.isOpen" :class="['submenu', { 'show': item.isOpen }]">
          <li v-for="(subitem, subIndex) in item.subitems" :key="'sub-' + subIndex" :class="{ 'show': subitem.isOpen }" class="navbar-subitem">
            <div @click.stop="toggleNested(index, subIndex)" class="navbar-sublink-wrapper">
              <a href="#" class="navbar-sublink">
                {{ subitem.title }}
                <span v-if="subitem.subsubitems.length" class="plus" :class="{ 'rotate': subitem.isOpen }">+</span>
              </a>
            </div>
            <ul v-if="subitem.isOpen" :class="['nested-submenu', { 'show': subitem.isOpen }]">
              <li v-for="(subsubmenu, subsubIndex) in subitem.subsubitems" :key="'subsub-' + subsubIndex">
                <a href="#" class="navbar-subsub-link">{{ subsubmenu }}</a>
              </li>
            </ul>
          </li>
        </ul>

      </li>

    </ul>

    <div class="navbar-logo">
      <img src="logo.png" alt="EVAS" class="logo" />
    </div>
    
  </nav>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      isMenuActive: false,
      menuItems: [
        { title: "Home", subitems: [] },
        { title: "Dashboards", subitems: [] },
        {
          title: "Hardening",
          isOpen: false,
          subitems: [
            {
              title: "Templates",
              isOpen: false,
              subsubitems: ["Web Design", "UI/UX"]
            },
            {
              title: "Comandos",
              isOpen: false,
              subsubitems: ["Web Dev", "App Dev"]
            },
            { title: "SEO", isOpen: false, subsubitems: [] },
          ]
        },
        { title: "Contato", subitems: [] },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    toggleSubmenu(index) {
      this.menuItems[index].isOpen = !this.menuItems[index].isOpen;
    },
    toggleNested(itemIndex, subIndex) {
      this.menuItems[itemIndex].subitems[subIndex].isOpen = !this.menuItems[itemIndex].subitems[subIndex].isOpen;
    },
  }
};
</script>

<style scoped>

body {  
  font-family: sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

.logo {
  height: 50px;
  width: auto;
}

.navbar {
  background-color: #061129;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}

.navbar-menu {
  display: flex;
}

.navbar-item {
  position: relative;
  padding: 10px 30px;
  border-right: 2px solid #e2e6e9;
  border-left: 2px solid #e2e6e9;
}

.navbar-item a {
  text-decoration: none;
  font-size: 20px;
  color: #e2e6e9;
  transition: all 0.3s;
}

.navbar-item a:hover {
  color: #046fc2;
}

.submenu {
  display: none;
  position: absolute;
  background-color: #061129;
  z-index: 1000;
  top: 100%;
  width: 100%;
  left: 0;
}

.submenu ul {
  display: block;
  left: 100%;
  top: 100%;
  width: 100%;
}

.submenu li {
  padding: 10px 0;
  width: 100%;
}

.submenu.show {
  display: block;
}

.arrow, .plus {
  margin-left: 5px;
  transition: transform 0.3s;
}

.rotate {
  transform: rotate(180deg);
}

</style>