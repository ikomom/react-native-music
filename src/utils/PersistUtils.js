/**
 *
 * @author ikonon
 * @create 2019/10/20
 */
let persistor;

export default class PersistUtils {
  static setPersist(_persistor) {
    persistor = _persistor;
  }

  static getPersist() {
    return persistor;
  }

  static clearPersist() {
    persistor
      .purge()
      .then(res => {
        console.log('清除成功', res);
      })
      .catch(err => {
        console.log('清除失败', err);
      });
  }
}
