import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";

const StyledPostPreview = styled(Link)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  padding: 2em 4em;
  transition: opacity 0.15s linear;
  &:hover {
    opacity: 0.7;
  }
`;

const PostTitleContainer = styled.div`
  width: 100%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
`;

const PostContentContainer = styled.div`
  max-width: 30%;
`;

const PostTitle = styled.span`
  font-size: 1.75rem;
  color: black;
  font-weight: bold;
`;
export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log(posts);
    return (
      <Layout>
        <section className="section">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
          </div>
          {posts.map(({ node: post }) => (
            <StyledPostPreview key={post.id} to={post.fields.slug}>
              <PostTitleContainer>
                <PostTitle>{post.frontmatter.title}</PostTitle>
                <small>{post.frontmatter.date}</small>
                <small>
                  {post.frontmatter.image &&
                    post.frontmatter.image.childImageSharp.fluid.src}
                </small>
              </PostTitleContainer>
              <PostContentContainer>
                {post.excerpt}
                <br />
                <br />
                <Link className="button is-small" to={post.fields.slug}>
                  Keep Reading →
                </Link>
              </PostContentContainer>
            </StyledPostPreview>
          ))}
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            full_image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
