import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { QuestionMark, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

function CategoryAccordion() {
  const theme = useTheme();
  return (
    <div>
      <Accordion sx={{ mx: theme.spacing(2), my: theme.spacing(1)}} TransitionProps={{}}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <QuestionMark />
          Example Category questions
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis deserunt quas dolore qui ducimus cumque laudantium
            nobis reiciendis, deleniti doloribus, rem atque officiis amet,
            dolores autem dicta. Consequuntur, officiis unde!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CategoryAccordion;
