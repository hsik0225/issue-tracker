import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import FilterVerticalList from "@FilterButton/FilterVerticalList";
import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";
import Header from "@Header/Header";
import CommentViewBox from "@CommentViewBox/CommentViewBox";
import { getDetailIssue } from "@Modules/issue";

const IssueDetailPage = ({ getDetailIssue, detailIssue, loadingDetailIssue }) => {
  const { issueId } = useParams();

  const CommentList = () => (
    <>
      {!loadingDetailIssue &&
        detailIssue &&
        detailIssue.comments.map((comment) => {
          const {
            comment: {
              id: { commentId },
              createdAt,
              content,
            },
            user,
          } = comment;

          return <CommentViewBox key={commentId} createdAt={createdAt} content={content} author={user} />;
        })}
    </>
  );

  useEffect(() => {
    const fn = async () => {
      try {
        await getDetailIssue(issueId);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, []);

  return (
    <>
      <Header />
      <ContentWrapper>
        <Content>
          <CommentViewBoxWrapper>
            {!loadingDetailIssue && detailIssue && (
              <CommentViewBox owner createdAt={detailIssue.createdAt} content={detailIssue.content} author={detailIssue.author} />
            )}
            <CommentList />
            <CommentInputBox />
          </CommentViewBoxWrapper>
          <FilterVerticalList />
        </Content>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const Content = styled.div`
  width: 65%;
  max-width: 1000px;
  min-width: 760px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  margin-top: 16px;
  padding-left: 72px;
`;

const CommentViewBoxWrapper = styled.div`
  width: 75%;
`;

export default connect(
  ({ issue, loading }) => ({
    detailIssue: issue.detailIssue,
    loadingDetailIssue: loading["issue/GET_DETAIL_ISSUE"],
  }),
  {
    getDetailIssue,
  }
)(IssueDetailPage);
