<style scoped>
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout .content-body {
  transition: 300ms ease-in-out;
  width: calc(100% - 200px);
  margin-left: auto;
  min-height: 100vh;
  scroll-behavior: smooth;
}
.ivu-layout .content-body.faint {
  width: calc(100% - 78px);
}
.ivu-layout-sider-collapsed {
  width: 100% !important;
}
.ivu-layout-sider {
  position: fixed;
  height: 100%;
  left: 0;
}

.layout .ivu-menu {
  z-index: 0;
}

.layout-header-bar {
  background: transparent;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
  cursor: pointer;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.menu-item .ivu-menu-item {
  padding: 0;
}
.menu-item .ivu-menu-item.search {
  padding: 14px 24px;
}
.nav-link {
  padding: 14px 24px;
}
.nuxt-link-exact-active.nuxt-link-active {
  background-color: #363e4f;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: #fff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical,
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical {
  background-color: transparent;
}
</style>

<template>
  <div class="layout">
    <Layout>
      <Sider
        ref="side"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        :class="['mobile-nav', isCollapsed && 'active']"
      >
        <Menu
          active-name="1-2"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="/">
            <nuxt-link to="/" class="nav-link">
              <i class="bi bi-currency-bitcoin me-3"></i>
              <span>Market</span>
            </nuxt-link>
          </MenuItem>

          <MenuItem name="exchange">
            <nuxt-link to="/exchange" class="nav-link">
              <i class="bi bi-currency-exchange me-3"></i>
              <span>Exchange</span>
            </nuxt-link>
          </MenuItem>

          <MenuItem name="contracts">
            <nuxt-link to="/contracts" class="nav-link">
              <i class="bi bi-chevron-contract me-3"></i>
              <span>Contracts</span>
            </nuxt-link>
          </MenuItem>

          <MenuItem name="1-4" class="search">
            <Icon type="ios-search" class="me-3"></Icon>
            <span>Search</span>
          </MenuItem>
          <div class="close-btn">
            <button class="btn btn-dark btn-sm" @click="isCollapsed = false">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </Menu>
      </Sider>

      <Layout>
        <section
          :class="[isCollapsed ? 'faint' : '', 'content-body px-4 mobile-main']"
        >
          <Header
            class="layout-header-bar dropdown p-0 d-flex align-items-center justify-content-between"
          >
            <i
              @click.stop="collapsedSider"
              :class="[rotateIcon]"
              class="bi bi-arrow-bar-left text-faint"
            ></i>
            <div class="d-flex align-items-center gap-3 pe-3">
              <Dropdown class="text-uppercase">
                <button class="btn text-faint d-flex align-item-center">
                  <span class="text-uppercase">{{ currency }}</span>
                  <span class="bi bi-caret-down-fill ms-2"></span>
                </button>

                <template #list>
                  <DropdownMenu
                    v-if="currency_list && Array.isArray(currency_list)"
                  >
                    <DropdownItem
                      v-for="item in currency_list"
                      :key="item"
                      @click="setCurrency(item)"
                    >
                      <span @click="setCurrency(item)">{{
                        item != currency ? item : ''
                      }}</span>
                    </DropdownItem>
                  </DropdownMenu>
                </template>
              </Dropdown>
            </div>
          </Header>

          <Content class="my-5 position-relative h-100">
            <Nuxt />
            <LayoutFooter />
          </Content>
        </section>
      </Layout>
    </Layout>
    <TopButton />
  </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import TopButton from '../components/TopButton.vue'

export default {
  data() {
    return {
      isCollapsed: false,
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    currency() {
      return this.$store.state.selected_currency
    },
    currency_list() {
      return this.$store.state.currencies
    },
  },
  methods: {
    collapsedSider() {
      this.$refs.side.toggleCollapse()
    },
    setCurrency(currency) {
      this.$store.commit('change_currency', currency);
    },
  },
  async created() {
    try {
      let res = await fetch(
        'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
      )
      this.$store.commit('Set_currency', await res.json())
      this.$store.dispatch('trends');
    } catch (e) {
      this.$Notice.open({ title: e, type: 'error' })
    }
  },
  components: { TopButton },
}
</script>