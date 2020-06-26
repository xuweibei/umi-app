export const withClick = (element, handClick = () => {}) => {
  if (!element) return;
  if (Object.prototype.toString.call(element) === '[object object]') {
    return <element.type {...element.props} onClick={handClick} />;
  }
  return <span onClick={handClick}>{element}</span>;
};
