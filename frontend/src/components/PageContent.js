import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.title}>Note that loading times are intentionally set to practice and display use cases of loading states and deferred component rendering. </p>
      {children}
    </div>
  );
}

export default PageContent;