import { Table } from 'antd';
import './index.scss';

export default function index({ className, ...rest }) {
  return <Table className={`'table-wrapper' ${className}`} {...rest} />;
}
