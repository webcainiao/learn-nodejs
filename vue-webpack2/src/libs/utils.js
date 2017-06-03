export const getTabInfo(good, top, tab, isClass){
  let str = '', className = '';
  if (good) {
    className = 'good';
    str = '精华';
  } else if (top) {
    className = 'top';
    str = '置顶';
  } else {
    switch (tab) {
      case 'ask':
        className = 'ask';
        str = '问答';
        break;
      case 'share':
        className = 'share';
        str = '分享';
        break;
      case 'job':
        className = 'job';
        str = '招聘';
        break;
      default:
        className = 'dev';
        str = '客户端测试';
        break;
    }
  }
  return isClass ? className : str;
}
