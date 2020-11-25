import { ErrorPage } from '/@/components/ErrorPage';

export default {
  render() {
    return (
      <ErrorPage
        oops={'抱歉!'}
        headline={'当前页面不存在...'}
        info={'请检查您输入的网址是否正确，或点击下面的按钮返回首页。'}
        btn={'返回首页'}
      >
        <div class="pic-error">
          <img class="pic-error-parent"
               src="/assets/error_images/404.png"/>
          <img
            class="pic-error-child left"
            src="/assets/error_images/cloud.png"
          />
        </div>
      </ErrorPage>
    );
  },
};
