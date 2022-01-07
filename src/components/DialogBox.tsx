import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormControl, OutlinedInput, TextField } from "@mui/material";

const DialogBox = (props: any) => {
  const { open, handleClose, removeOneItem } = props;
  const [valueConfirm, setValueConfirm] = useState("");

  const onClose = () => {
    setValueConfirm("");
    handleClose();
  };

  const onRemove = () => {
    setValueConfirm("");
    removeOneItem();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        آیا از تصمیم خود مطمئن هستید؟
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          برای حذف مسیر ارتباطی {"name"} لطفا تایید را بنویسید
        </DialogContentText>
        <FormControl variant="outlined" className="mt-2">
          <input
            className="form-control shadow-none"
            type="text"
            placeholder="تایید"
            value={valueConfirm}
            name="socialId"
            dir="rtl"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValueConfirm(e.target.value);
            }}
          ></input>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button className="text-secondary" onClick={onClose}>
          انصراف
        </Button>
        <Button
          disabled={valueConfirm !== "تایید"}
          className={`${
            valueConfirm !== "تایید" ? "disabled" : "text-danger "
          }`}
          onClick={onRemove}
          autoFocus
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
