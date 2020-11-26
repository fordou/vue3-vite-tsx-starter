import { defineComponent } from '/@/utils/define-component';
import { onMounted, reactive } from 'vue';
import { getList } from '/@/api/table';
import { Table } from 'ant-design-vue';
import { asyncCatch } from '/@/utils/async-catch';

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
  },
  {
    title: 'description',
    dataIndex: 'description',
  },
  {
    title: 'author',
    dataIndex: 'author',
  },
  {
    title: 'datetime',
    dataIndex: 'datetime',
  },
];
export default defineComponent({
  setup() {
    const data = reactive({
      data: [],
      pagination: {
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
        current: 1,
        pageSize: 20,
        total: 20,
      },
      query: {},
      loading: false,
      columns,
    });

    function handleTableChange({ current }: { current: number }) {
      data.pagination = { ...data.pagination, current };
      fetch();
    }

    async function fetch() {
      data.loading = true;
      const [res] = await asyncCatch(getList({
        pageSize: data.pagination.pageSize,
        current: data.pagination.current,
      }));
      const { data:list, total } = res;
      const pagination = { ...data.pagination };
      pagination.total = total;
      data.loading = false;
      data.data = list;
      data.pagination = pagination;

    }

    onMounted(fetch);

    return () => (
      <Table
        columns={columns}
        rowKey={(record: { uuid: any; }) => record.uuid}
        dataSource={data.data}
        pagination={data.pagination}
        loading={data.loading}
        onChange={handleTableChange}
      />
    );
  },
});
