import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, notification, Table } from 'antd';

import { useLazyQuery } from '@apollo/client';
import { NoticeDetailModal } from '../../components/NoticeDetailModal';
import TransformBox from '../../components/TransformBox';
import { noticeColumns, NoticeType } from '../../utils/columns';

export function Notice() {
  const [noticeData, setNoticeData] = useState<NoticeType[]>([]);
  const [modalData, setModalData] = useState<NoticeType>();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleClick = () => {
    setVisible(true);
    setIsEdit(false);
  };

  const handleRow = (record: NoticeType) => {
    setVisible(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ take, skip })
    //     .then((data) => {
    //       const { notices, totalCount } = data.data.seeNoticeHistoryByAdmin;
    //       setNoticeData(notices);
    //       setTotalCount(totalCount);
    //       if (notices.length < 0 && skip !== 0) {
    //         setSkip(skip - take);
    //       }
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  const handleSearch = (value: { searchText?: string }) => {
    // getNotices({
    //   variables: {
    //     searchText: value.searchText,
    //     skip: 0,
    //     take,
    //   },
    // });
    setSkip(0);
    setCurrent(1);
    setSearchText(value.searchText ?? '');
  };

  // get notice list
  // const [getNotices, { loading, refetch }] = useLazyQuery<
  //   SeeNoticeHistoryByAdminResponse,
  //   SeeNoticeHistoryByAdminParams
  // >(SEE_NOTICE_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setNoticeData(data.seeNoticeHistoryByAdmin.notices);
  //     setTotalCount(data.seeNoticeHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   getNotices({
  //     variables: {
  //       take,
  //       skip,
  //       searchText,
  //     },
  //   });
  // }, [take, skip]);

  return (
    <>
      <NoticeDetailModal
        data={modalData}
        visible={visible}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
      />
      <Divider>공지사항</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="검색어(제목, 내용)"
            onSearch={(e) => {
              handleSearch({ searchText: e });
            }}
          />
        </Form.Item>
      </Form>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          공지사항 등록
        </Button>
      </TransformBox>

      <Table
        columns={noticeColumns}
        dataSource={noticeData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: '30px',
        }}
        rowKey={(rec) => rec.id}
        // loading={loading}
        scroll={{ x: 800 }}
      />
    </>
  );
}
