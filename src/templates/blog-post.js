import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Img from "gatsby-image";

const StyledContainer = styled.div`
  max-width: 100%;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70%;
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <StyledContainer className="section">
      {helmet || ""}
      <StyledContent>
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <p>{description}</p>
        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </StyledContent>
    </StyledContainer>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
