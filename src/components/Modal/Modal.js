//This component displays a popup modal whenever user clicks on a PR

//React's dependencies
import { React, useCallback } from "react";

//Material UI's dependencies
import { Avatar, Typography, Fade, Modal, Box, Backdrop } from "@mui/material";

//Local stylesheet
import "./style.css";

export default function Modals({ pr, open, setOpen }) {
  //Receving PR data, open and setOpen state from 'List' component
  const handleClose = useCallback(() => {
    //This function toggled the setOpen state
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {pr && (
          <Fade in={open}>
            <Box className="box">
              <div className="avatar">
                {/* Displays user's profile picture */}
                <Avatar
                  alt={pr.user.login}
                  src={pr.user.avatar_url}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="body2" style={{ marginLeft: 10 }}>
                  {/* Displays user's username */}
                  {pr.user.login}
                </Typography>
              </div>
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
              >
                {/* Displays the title of the PR */}
                {pr.title}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, mb: 2 }}
              >
                {/* Displays the PR's body content */}
                {pr.body}
              </Typography>
              {/* This will be displayed only if the PR has an assignee assigned */}
              {pr.assignee && pr.assignee.login.length > 1 && (
                <>
                  <Typography variant="h6">Assigned to</Typography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Displays assignee's profile picture */}
                    <Avatar
                      alt={pr.assignee.login}
                      src={pr.assignee.avatar_url}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                      {/* Displays assignee's username */}
                      {pr.assignee.login}
                    </Typography>
                  </div>
                </>
              )}
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {
                  // Displays the hyperlink of PR
                  <a href={pr.html_url} target="_blank" rel="noreferrer">
                    PR Link
                  </a>
                }
              </Typography>
            </Box>
          </Fade>
        )}
      </Modal>
    </div>
  );
}