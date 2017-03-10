import ui from '@/model/ui';
import util from '@/model/util';

/**
 * 显示/隐藏Loading
 * @param  {Boolean} value Loading标示
 */
function toggleLoading(value) {
  if (value) {
    ui.Loading.service({ fullscreen: true });
  } else {
    ui.Loading.service({ fullscreen: true }).close();
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export default function (request, next) {
  // 显示Loading
  toggleLoading(true);
  // 设置超时时间
  request.timeout = util.getConfigValue('SERVICE_TIME_OUT') || 1000;

  next((response) => {
    // 隐藏Loading
    toggleLoading(false);
    // 出现网络异常的场合
    if (!response.ok) {
      ui.Notification({
        type: 'error',
        title: '服务异常',
        message: '服务调用出现网络错误，无法调用指定服务，请检查网络',
        duration: 3000,
      });
    }
  });
}