import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";

export default function BlogPost(props): ReactNode {
  return (
    <div className={general.pageContainer}>
      <Head>
        <title>my blog post</title>
        <link rel={"icon"} href={"/eye-of-judgment.jpg"} />
      </Head>
      <div className={general.postContainer}>
      <h3 className={general.navHeader}>
        home / blog
      </h3>
      <h1 className={general.pageTitle}>
        Prevent vs. Blame Systems
      </h1>
      <p className={styles.caption}>
        last edited
        <select className={styles.versionSelect}>
          <option className={styles.versionOption}
              value={"2020.10.19"}
              label={"2020.10.19"} />
        </select>
      </p>
      <p className={general.bodyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa semper aliquam quis mattis quam. Morbi vitae tortor tempus, placerat leo et, suscipit lectus. Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, dapibus dolor eget, dictum arcu. In nec purus eu tellus consequat ultricies. Donec feugiat tempor turpis, rutrum sagittis mi venenatis at. Sed molestie lorem a blandit congue. Ut pellentesque odio quis leo volutpat, vitae vulputate felis condimentum. Praesent vulputate fermentum lorem, id rhoncus sem vehicula eu. Quisque ullamcorper, orci adipiscing auctor viverra, velit arcu malesuada metus, in volutpat tellus sem at justo.</p>
      <img className={styles.insertImage}
          src={"/thumbs/twitter.jpg"} />
      <p className={styles.caption}>caption</p>
      <p className={general.bodyText}>Fusce non fermentum mi. Praesent vel lobortis elit. Nulla sodales, risus quis sollicitudin iaculis, felis dolor aliquet purus, eget elementum velit nunc eu dolor. Curabitur elit tellus, dictum non sem sit amet, viverra lobortis velit. Quisque facilisis, neque cursus ullamcorper ornare, dolor metus aliquam lacus, pharetra porttitor massa neque ut ligula. Vivamus laoreet nulla diam, eget adipiscing felis scelerisque sit amet. Mauris egestas, nisi vitae cursus tincidunt, urna ipsum facilisis eros, ut venenatis dui tellus sit amet orci. Nullam a rhoncus diam, eget tristique felis. Nulla egestas adipiscing fermentum. Aenean sagittis libero at eros ornare molestie. Morbi convallis ornare imperdiet. Mauris convallis tristique erat ac eleifend.</p>
      <p className={general.bodyText}>Nunc ullamcorper neque nunc, vitae sollicitudin nunc placerat nec. Suspendisse vel enim ultrices, fringilla urna luctus, lacinia est. Quisque mattis dictum sapien vitae laoreet. Suspendisse ultricies, lorem id tempor elementum, turpis magna pharetra purus, ac pulvinar metus ante quis nisi. Praesent dui massa, egestas dictum mi ut, tempus consequat neque. Maecenas urna tellus, fermentum at velit ac, commodo ultricies orci. Morbi augue dui, tincidunt et purus quis, consequat dictum enim.</p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const content: {} = {};

  return {
    props: content
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          post: "bitch"
        }
      }
    ],
    fallback: true
  };
}