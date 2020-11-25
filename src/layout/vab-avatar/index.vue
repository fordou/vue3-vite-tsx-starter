<template>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import {CONFIG} from '/@/config'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { mapGetters } from 'vuex'

  const { recordRoute } = CONFIG
  export default {
    name: 'VabAvatar',
    components: { DownOutlined },
    computed: {
      ...mapGetters({
        avatar: 'USER/avatar',
        username: 'USER/username',
      }),
    },
    methods: {
      async logout() {
        await this.$store.dispatch('USER/logout')
        if (recordRoute) {
          const fullPath = this.$route.fullPath
          this.$router.push(`/login?redirect=${fullPath}`)
        } else {
          this.$router.push('/login')
        }
      },
    },
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }
  }
</style>
