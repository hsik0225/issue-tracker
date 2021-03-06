import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Button from "@Style/Button";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import Milestone from "@MilestonePage/Milestone/Milestone";
import Table from "@Table/Table";
import HeaderSwitch from "@Table/HeaderSwitch/HeaderSwitch";
import { getMilestone, patchMilestone, deleteMilestone } from "@Modules/milestone";

const MilestonePage = ({ getMilestone, patchMilestone, deleteMilestone, milestones, loadingMilestone }) => {
  let history = useHistory();
  let location = useLocation();
  const onPassCreateMilestonePage = () => history.push(`/CreateMilestonePage`);

  const isLoaded = !loadingMilestone && milestones;

  const openCount = isLoaded && milestones.numberOfOpenMilestone;
  const closeCount = isLoaded && milestones.numberOfClosedMilestone;

  const [isOpenView, setIsOpenView] = useState(true);

  const onSwitch = (isOpen) => setIsOpenView(isOpen);

  const MilestoneList = ({ isOpen }) => (
    <>
      {milestones.milestones
        .filter((milestone) => milestone.isOpen === isOpen)
        .sort((a, b) => b.id - a.id)
        .map((milestone) => (
          <Milestone key={milestone.id} milestone={milestone} patchHandler={patchHandler} deleteHandler={deleteHandler} />
        ))}
    </>
  );

  const getHandler = async () => {
    try {
      await getMilestone();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHandler();
  }, [getMilestone, patchMilestone, deleteMilestone, location]);

  const deleteConfirm = () => {
    return confirm("Are you sure?");
  };

  const patchHandler = (milestoneId) => {
    const fn = async () => {
      try {
        await patchMilestone(milestoneId);
        getHandler();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  const deleteHandler = (milestoneId) => {
    if (!deleteConfirm()) return;
    const fn = async () => {
      try {
        await deleteMilestone(milestoneId);
        getHandler();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <NavigationButton isMilestone />
          <Button onClick={onPassCreateMilestonePage}>New Milestone</Button>
        </NavBar>
      </NavBarWrap>
      {isLoaded && (
        <Table
          tableHeader={<HeaderSwitch openCount={openCount} closeCount={closeCount} onSwitch={onSwitch} />}
          tableList={<MilestoneList isOpen={isOpenView} />}
        />
      )}
    </>
  );
};

const NavBarWrap = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const NavBar = styled.nav`
  width: 65%;
  max-width: 1000px;
  min-width: 760px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default connect(
  ({ milestone, loading }) => ({
    milestones: milestone.milestones,
    loadingMilestone: loading["milestone/GET_MILESTONE"],
  }),
  {
    getMilestone,
    patchMilestone,
    deleteMilestone,
  }
)(MilestonePage);
