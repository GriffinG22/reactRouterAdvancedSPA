import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;