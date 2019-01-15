import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Img from "gatsby-image";
import styled from "styled-components";

const StyledPostPreview = styled(Link)`
  display: flex;
  max-width: 925px;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 250px;
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
const ImageContainer = styled.div`
  width: 100%;
  max-width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostContentContainer = styled.div`
  display: flex;
  max-width: 30%;
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
`;

const PostTitle = styled.span`
  font-size: 1.75rem;
  color: black;
  font-weight: bold;
  font-family: aktiv-grotesk, sans-serif;
  font-weight: 800;
  line-height: 1.09;
  letter-spacing: -0.7px;
`;

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log(posts);
    return (
      <Layout>
        <section className="section">
          {posts.map(({ node: post }) => (
            <StyledPostPreview key={post.id} to={post.fields.slug}>
              <PostTitleContainer>
                <PostTitle>{post.frontmatter.title}</PostTitle>
                <small>{post.frontmatter.date}</small>
                <small>{post.fields.readingTime.text}</small>
              </PostTitleContainer>
              <PostContentContainer>
                <span>{post.excerpt}</span>
              </PostContentContainer>
              <ImageContainer>
                {post.frontmatter.image && (
                  <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                )}
              </ImageContainer>
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
          excerpt(pruneLength: 200)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                fluid(maxWidth: 1080) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
