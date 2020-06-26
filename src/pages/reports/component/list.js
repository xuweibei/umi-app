import React from 'react'
import { connect } from 'dva'
import { Row, Col, Card, Pagination, Tooltip, Icon, Popconfirm, message } from 'antd';

function List({ list, page, pageSize, total, dispatch }) {
    const colSpan = { xl: 6, xxl: 4, span: 6 };
    const seeEditReports = () => {

    }

    const handlePagination = current => {
        if (current !== page) {
            dispatch({ type: 'reports/fetch', payload: { page: current } })
        }
    }

    const handleDelete = id => {
        dispatch({
            type: 'reports/remove',
            payload: id
        }).then(res => {
            if (res && res.state === 'success') {
                message.success(res.msg);
                handlePagination(1);
            } else {
                message.error('删除失败')
            }
        })
    }


    return (
        <div>
            <Row gutter={20}>
                {
                    list.length ? list.map(item => (
                        <Col {...colSpan} key={item.id} onClick={() => seeEditReports(item)}>
                            <Card
                                title={item.createTime ? item.createTime.slice(0, 20) : ''}
                                extra={
                                    <>
                                        <Tooltip>
                                            <a href={`/reports/write/${item.id}`}><Icon type="form" /></a>
                                        </Tooltip>
                                        <Popconfirm title='确认删除该周报吗？' onConfirm={() => handleDelete(item.id)}>
                                            <Tooltip>
                                                <a><Icon type='delete' /></a>
                                            </Tooltip>
                                        </Popconfirm>
                                    </>
                                }
                            >
                                <p>{item.createTime ? item.title.slice(0, 20) : ''}</p>
                                <p>接收人：{item.receiverName}</p>
                            </Card>
                        </Col>
                    )) : ''
                }
            </Row>
            {
                list.length ? <Pagination
                    className='global-pagination'
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePagination}
                /> : ''
            }
        </div>
    )
}
export default connect(({ reports }) => ({ ...reports }))(List)