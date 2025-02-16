<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="logo.png" alt="Logo" class="logo" />
    </div>

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
        { title: "Sobre", subitems: [] },
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
  /* Global Styles */
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    padding: 0 20px;
  }

  .logo {
    height: 50px;
    width: auto;
  }

  .navbar-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
  }

  .bar {
    height: 3px;
    width: 25px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }

  /* Menu Styles */
  .navbar-menu, .submenu, .nested-submenu {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #444;
  }

  .navbar-menu {
    display: flex;
  }

  .navbar-menu.active, .submenu.show, .nested-submenu.show {
    display: block;
  }

  .navbar-item {
    position: relative;
    margin-bottom: 10px;
  }

  .navbar-link-wrapper, .navbar-sublink-wrapper {
    cursor: pointer;
    padding: 14px 20px;
  }

  .navbar-link, .navbar-sublink, .navbar-subsub-link {
    color: white;
    text-decoration: none;
    display: block;
  }

  .navbar-link:hover, .navbar-sublink:hover, .navbar-subsub-link:hover {
    background-color: #ddd;
    color: black;
  }

  .submenu, .nested-submenu {
    position: absolute;
    left: 0;
    right: 0;
    display: none;
  }

  .nested-submenu {
    margin-left: 100%;
    width: 100%;
  }

  .submenu > li, .nested-submenu > li {
    padding: 8px 20px;
  }

  /* Additional Elements */
  .arrow, .plus {
    margin-left: 5px;
    transition: transform 0.3s;
  }

  .rotate {
    transform: rotate(180deg);
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .navbar-toggle {
      display: flex;
    }

    .navbar-menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
    }

    .navbar-menu.active {
      display: flex;
    }
  }
</style>