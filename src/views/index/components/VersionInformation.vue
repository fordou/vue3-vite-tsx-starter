<template>
  <a-alert
      :message="
      '基于 vue ' +
      dependencies['vue'] +
      ' + ant-design-vue ' +
      dependencies['ant-design-vue']
    "
      type="success"
      show-icon
  />

  <a-card class="version-information">
    <template v-slot:title>系统信息</template>
    <template v-slot:extra>
      <a href="#">部署时间{{ updateTime }}</a>
    </template>
    <div class="version-information-table">
      <table>
        <tr>
          <td>vue</td>
          <td>{{ dependencies['vue'] }}</td>
          <td>@vue/cli</td>
          <td>{{ devDependencies['@vue/cli-service'] }}</td>
        </tr>
        <tr>
          <td>vuex</td>
          <td>{{ dependencies['vuex'] }}</td>
          <td>vue-router</td>
          <td>{{ dependencies['vue-router'] }}</td>
        </tr>
        <tr>
          <td>eslint-plugin-vue</td>
          <td>{{ devDependencies['eslint-plugin-vue'] }}</td>
          <td>axios</td>
          <td>{{ dependencies['axios'] }}</td>
        </tr>
        <tr>
          <td>babel-eslint</td>
          <td>{{ devDependencies['babel-eslint'] }}</td>
          <td>ant-design-vue</td>
          <td>{{ dependencies['ant-design-vue'] }}</td>
        </tr>
      </table>
    </div>
  </a-card>
</template>
<script>
import { dependencies, devDependencies } from '../../../../package.json'

export default {
  data() {
    return {
      updateTime: new Date(),
      dependencies: dependencies,
      devDependencies: devDependencies,
    }
  },
}
</script>
<style lang="less" scoped>
@import "src/styles/var";

.version-information {
  margin-top: @vab-margin;
  &-table {
    width: 100%;
    overflow: scroll;
    table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
}
</style>
