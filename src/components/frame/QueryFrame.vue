/**
* Created by tudou on 2020/4/12 12:27.
*/
<template>
  <div class="query__wrapper">
    <!-- 查询条件 开始 -->
    <div class="query__header">
      <a-form-model
        layout="inline">
        <div
          ref="queryCondition"
          :class="{'query__condition': true, 'is--oneline': !isBarOpen, 'is--opened': isBarOpen}"
          @click="handleBarToggle(true)">

          <!-- 自定义条件 开始 -->
          <slot name="query"></slot>
          <!-- 自定义条件 结束 -->

          <a-form-model-item class="query-item">
            <a-button class="mr-10" type="primary" html-type="submit" icon="search" @click.stop="handleSearch" :loading="loading">{{$t('common.queryBtn')}}</a-button>
            <a-button html-type="reset" icon="redo" @click.stop="handleReset">{{$t('common.resetBtn')}}</a-button>
          </a-form-model-item>
        </div>
      </a-form-model>
      <div class="query-bar" v-if="barVisiable" @click="handleBarToggle()">
        <span
          :class="{'primary-color': isBarOpen, '': !isBarOpen}">{{isBarOpen ? $t('common.barFold') : $t('common.barUnfold')}}
          <i-icon :type="isBarOpen ? 'icon-menu-up' : 'icon-menu-down'"></i-icon></span>
      </div>
    </div>
    <!-- 查询条件 结束 -->

    <!-- 查询结果 开始 -->
    <div :class="{'query__main': true, 'is--bar-visiable': barVisiable}">
      <a-spin :spinning="loading" :tip="$t('common.loading')">
        <!-- 支持 默认的新增-->
        <div class="query__options">
          <a-button class="mr-10" type="primary" icon="plus" v-if="addVisiable" :disabled="addDisable" @click="handleAdd">{{addBtnTxt}}</a-button>
          <!--<a-button class="mr-10" type="primary" icon="download">下载</a-button>-->
          <!--<a-button class="mr-10" type="primary" icon="printer">打印</a-button>-->
          <!--<a-button class="mr-10" type="primary" icon="delete">删除</a-button>-->
          <slot name="btns"></slot>
        </div>

        <!--<div class="query__summary">-->
          <!--<slot name="summary"></slot>-->
          <!--<div class="query__summary__title">合计</div>-->
          <!--<div class="query__summary__group">-->
            <!--<div class="query__summary&#45;&#45;label">含税总金额：</div>-->
            <!--<div class="query__summary&#45;&#45;value">{{234}}</div>-->
          <!--</div>-->
          <!--<div class="query__summary__group">-->
            <!--<div class="query__summary&#45;&#45;label">含税总金额：</div>-->
            <!--<div class="query__summary&#45;&#45;value">{{234}}</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="query__result">
          <slot name="table"></slot>
          <div class="query__page" v-if="pageVisiable">
            <a-pagination
              showQuickJumper
              showSizeChanger
              :current="current"
              :page-size="pageSize"
              :show-total="showTotal"
              :page-size-options="['10', '20', '30', '40', '50', '100']"
              :total="total"
              @showSizeChange="handlePageSizeChange"
              @change="handlePageNoChange">
            </a-pagination>
          </div>
        </div>
      </a-spin>
    </div>
    <!-- 查询结果 结束 -->
  </div>
</template>

<script>
export default {
  name: 'QueryFrame',
  components: {},
  props: {
    // loading: { // 页面是否正在加载中
    //   type: Boolean,
    //   default: false,
    // },
    addText: { // 添加按钮的文字
      type: [String, Boolean, Number],
    },
    addVisiable: { // 是否显示添加按钮
      type: Boolean,
      default: true,
    },
    addDisable: { // 是否禁用添加按钮
      type: Boolean,
      default: false,
    },
    current: Number, // 当前页
    pageSize: { // 每页显示多少条数据
      type: Number,
      default: 10,
    },
    total: { // 总记录数
      type: Number,
      default: 0,
    },
    pageVisiable: { // 是否显示分页器 false适用于无分页列表
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      barVisiable: false, // 是否显示 展开|收起
      isBarOpen: true, // 展开|收起查询条件 默认展开，用户获取ref=queryCondition的高度
    };
  },
  computed: {
    loading() {
      return this.$store.state.app.loading;
    },
    addBtnTxt() {
      return this.addText || this.$t('common.addBtn');
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.initQueryBar();
  },
  destroyed() {
  },
  methods: {
    // 初始化查询条件的高度
    initQueryBar() {
      const defaultHeight = 57; // 一行查询条件的高度是57 2行 110
      const barHeight = this.$refs.queryCondition.offsetHeight;

      if (barHeight > defaultHeight) {
        this.barVisiable = true;
      } else {
        this.barVisiable = false;
      }
      this.isBarOpen = false; // 获取到高度后收起
    },

    // 展开或则收起查询条件 flag=true为点条件时候展开
    handleBarToggle(flag) {
      if (flag) {
        this.isBarOpen = true;
      } else {
        this.isBarOpen = !this.isBarOpen;
      }
    },

    // 查询
    handleSearch() {
      this.$emit('on-query');
    },

    // 重置查询条件
    handleReset() {
      this.$emit('on-reset');
    },

    // 添加
    handleAdd() {
      this.$emit('on-add');
    },

    // 用于显示数据总量和当前数据顺序
    showTotal(total) {
      return `${this.$t('common.pageTotal')} ${total} ${this.$t('common.pageItem')}`;
    },

    // 页码改变的回调，参数是改变后的页码及每页条数
    handlePageNoChange(pageNo, pageSize) {
      this.$emit('on-page-change', pageNo, pageSize);
    },

    // pageSize 变化的回调
    handlePageSizeChange(current, pageSize) {
      this.$emit('on-size-change', current, pageSize);
    },

  }
};
</script>

<style lang="less" scoped>
  @import "../../style/modules/variables";

  .query__wrapper {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    overflow: auto;
  }

  .query__header {
    position: relative;
    padding: 20px 16px 5px;
    background-color: #fff;
    border-bottom: 1px solid @border-color-secondary;
  }

  .query__condition{
    display: flex;
    padding: 0 16px;
    flex-wrap: wrap;
    overflow: hidden;
    transition: all 3s;

    &.is--oneline {
      height: 57px;
    }
    &.is--opened {
      height: auto;
    }
  }

  .query__item{
    display: flex;
    align-items: center;
    margin-right: 32px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  .query-bar {
    position: absolute;
    bottom: -25px;
    left: 50%;
    width: 60px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    border-radius: 0 0 5px 5px;
    background: @white;
    border: 1px solid @border-color-base;
    cursor: pointer;
    transform: translateX(-50%);
    user-select: none;

    &:hover {
      color: @primary-color;
      border: 1px solid @primary-color;
    }
  }

  .query__main {
    margin: 16px;
    padding: 16px;
    background: #fff;
    flex: 1 0 auto;
    overflow: auto;

    &.is--bar-visiable {
      margin: 30px 16px;
    }

    .query__options {
      margin-bottom: 16px;
    }

    .query__summary {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 16px;
      .query__summary__title {
        margin-right: 16px;
        font-weight: bold;
      }
      .query__summary__group {
        display: flex;
        margin-right: 16px;
        .query__summary--value {
          min-width: 20px;
        }
      }
    }
    .query__result {
    }

    .query__page {
      margin-top: 16px;
      text-align: right;
    }
  }
</style>
