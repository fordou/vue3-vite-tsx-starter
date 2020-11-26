import { defineComponent } from '/@/utils/define-component';
import { onMounted, reactive } from 'vue';
import { getIconList } from '/@/api/icon';
import { asyncCatch } from '/@/utils/async-catch';
import {
  Alert,
  Card,
  Col,
  Divider,
  Input, message,
  Pagination,
  Row,
} from 'ant-design-vue';
import { VabIcon } from '/@/layout/vab-icon';
import _ from 'lodash';
import copy from 'copy-to-clipboard';

const queryForm = reactive({
  current: 1,
  pageSize: 72,
  title: '',
});

const response = reactive({
  icons: [],
  total: 0,
});

async function fetchData() {
  const [res] = await asyncCatch(getIconList(queryForm));
  const { data, totalCount } = res;
  response.icons = data;
  response.total = totalCount;
}

const searchData = _.debounce(fetchData, 300);

function handleSearchEvent(e: InputEvent) {
  queryForm.title = (e.target as HTMLInputElement)?.value;
  queryForm.current = 1
  searchData();
}
function handlePageChangeEvent(pageIndex:number,pageSize:number) {
  queryForm.current = pageIndex
  queryForm.pageSize = pageSize
  searchData();
}

function renderSearch() {
  return (
    <div class="flex justify-center m-10">
      <Input.Search
        value={queryForm.title}
        onChange={handleSearchEvent}
        size={'large'}
        placeholder={'图标名称'}
      />
    </div>
  );
}


function copyTo(text:string){
  const html = `<VabIcon icon="${text}" />`
  copy(html)
  message.success(`${html} - 复制成功！`)
}

export default defineComponent({
  setup() {
    onMounted(fetchData);
  },
  render() {
    const searchVNode = renderSearch();
    return (<div class="icon-container">
      <Alert message={'点击图标即可复制代码'} type={'success'} show-icon/>
      {searchVNode}
      <Divider class="mb-10"/>
      <Row gutter={20}>
        {
          response.icons.map(text => (
            <Col key="index" sm={8} xs={6} md={4} lg={3} xl={3}
                 class="text-gray-500 hover:text-gray-600 cursor-pointer">
              <div onClick={() => copyTo(text)}>
                <Card
                  class="text-center rounded-md border-gray-100 hover:border-gray-500">
                  <VabIcon className="text-3xl text-gray-600" icon={text}/>
                </Card>
                <div class="text-center py-2">
                  {text}
                </div>
              </div>
            </Col>
          ))
        }

        <Col span="24">
          <Pagination
            pageSize={queryForm.pageSize}
            // @ts-ignore
            onChange={handlePageChangeEvent}
            current={queryForm.current}
            total={response.total}
          />
        </Col>
      </Row>
    </div>);
  },
});
