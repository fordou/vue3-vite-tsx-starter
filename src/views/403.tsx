import { ErrorPage } from '/@/components/ErrorPage';

export default {
  render() {
    return (
      <ErrorPage
        oops={'抱歉!'}
        headline={'您没有操作权限...'}
        info={'当前帐号没有权限访问,请联系管理员。'}
        btn={'返回首页'}
      >
        <div class="pic-error">
          <img class="pic-error-parent"
               src="/assets/error_images/403.png"/>
          <img
            class="pic-error-child left"
            src="/assets/error_images/cloud.png"
          />
        </div>
      </ErrorPage>
    );
  },
};
