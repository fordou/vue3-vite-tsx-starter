
export interface TreeNode {
  parentId: string;
  id: string;
  children: TreeNode[];
}

/**
 * @author DOU
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data: TreeNode[]) {
  const parent = data.filter((value) => value.parentId === 'undefined' || value.parentId == null);
  const children = data.filter((value) => value.parentId !== 'undefined' && value.parentId != null);
  const translator = (parent: TreeNode[], children: TreeNode[]) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          if (parent.children) {
            parent.children.push(current);
          } else {
            parent.children = [current];
          }
        }
      });
    });
  };
  translator(parent, children);
  return parent;
}

/**
 * @author DOU
 * @description 树形结构数据转换成父子关系的数组
 * @param data
 * @returns {[]}
 */
export function translateTreeToData(data: TreeNode[]) {
  const result: TreeNode[] = [];
  data.forEach((item) => {
    const loop = (data: TreeNode) => {
      result.push({
        ...data,
        parentId: data.parentId,
      });
      const child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
}
