import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Collapse } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogBox from "./DialogBox";
import Alert from "@mui/material/Alert";
import { createPath, editPath, getPathes, removePath } from "../services";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

import {
  Add,
  Edit,
  Delete,
  Web,
  Telegram,
  Instagram,
  Twitter,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";
import { ColorModeContext } from "../App";

const useStyles = makeStyles({
  btnAdd: {
    margin: 3,
    fontSize: "18px",
    fontWeight: "bold",
  },
  card: {
    margin: "1rem",
  },
  cardList: {
    margin: "0.5rem 1rem ",
  },
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

interface EnumServiceItem {
  social_id: string;
  social_link: string;
  social_type: string;
}

interface EnumServiceItemId extends EnumServiceItem {
  id: string;
}

interface EnumServiceItems extends Array<EnumServiceItemId> {}

interface dataInterface {
  socialId?: string;
  socialLink?: string;
  type?: string;
}

const dataDefault = {
  socialId: "",
  socialLink: "",
  type: "",
};

const ManagePath = () => {
  const [pathes, setPathes] = useState<EnumServiceItems>([]);
  const [activeNewPath, setActiveNewPath] = useState(false);
  const [open, setOpen] = useState(false);
  const [ids, setIds] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [data, setData] = useState<dataInterface>(dataDefault);
  const [statusEdit, setStatusEdit] = useState(false);
  const [loader, setLoader] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const { data } = await getPathes();
        setPathes(data);
      } catch (err) {
        setLoader(false);
        console.log(false);
      }
      setLoader(false);
    };
    fetchData();
  }, []);

  const addPath = (): void => {
    setActiveNewPath((path) => !path);
    setStatusEdit(false);
    setData(dataDefault);
  };

  const handleResetForm = () => {
    setData(dataDefault);
    setActiveNewPath(false);
    setStatusEdit(false);
  };

  const handleAddOnePath = async (values: any, { resetForm }: any) => {
    setLoader(true);
    try {
      const path: EnumServiceItem = {
        social_id: values?.socialId,
        social_link: values?.socialLink,
        social_type: values.type,
      };
      if (statusEdit) {
        const newPathEdit: EnumServiceItemId = {
          ...path,
          id: ids,
        };
        const edPath = await editPath(ids, newPathEdit);
        if (edPath.status === 200) {
          setPathes((oldPath) => oldPath.filter((item) => item.id !== ids));
          setPathes((oldPath) => [...oldPath, edPath.data]);
        }
        resetForm();
        addPath();
      } else {
        if (
          pathes.find(
            (item) =>
              item.social_id === values.socialId &&
              item.social_link === values.socialLink
          )
        ) {
          setErrorFound(true);
        } else {
          const newPath = await createPath(path);
          if (newPath.status === 201) {
            setPathes((oldPath) => [...oldPath, newPath.data]);
          }
          resetForm();
          addPath();
        }
      }
    } catch (err: any) {
      setLoader(false);
      console.log(err.response);
    }
    setLoader(false);
  };

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setIds(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currencies = [
    {
      value: "0",
      label: "اینستاگرام",
      icon: <Instagram />,
    },
    {
      value: "1",
      label: "فیسبوک",
      icon: <Facebook />,
    },
    {
      value: "2",
      label: "تلگرام",
      icon: <Telegram />,
    },
    {
      value: "3",
      label: "توییتر",
      icon: <Twitter />,
    },
    {
      value: "4",
      label: "لینکدین",
      icon: <LinkedIn />,
    },
    {
      value: "5",
      label: "وب سایت",
      icon: <Web />,
    },
  ];

  const removeOneItem = async () => {
    setLoader(true);
    try {
      await removePath(ids);
      handleClose();
      setPathes((oldPath) => oldPath.filter((path) => path.id !== ids));
      setIds("");
    } catch (err: any) {
      setLoader(false);
      console.log(err.response);
    }
    setLoader(false);
  };
  const editOneItem = (id: string) => {
    setStatusEdit(true);
    setActiveNewPath(true);
    const item = pathes.find((item) => item.id === id);
    setIds(id);
    setData({
      socialId: item?.social_id,
      socialLink: item?.social_link,
      type: item?.social_type,
    });
  };

  const propsDialog = {
    open,
    handleClose,
    removeOneItem,
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        flexDirection: "column",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mx-3 w-100">
        <Button
          className={classes.btnAdd}
          variant="text"
          color="warning"
          onClick={addPath}
        >
          {statusEdit ? (
            <span>
              <Edit className="fs-6 ms-1" />
              &nbsp;ویرایش&nbsp;
            </span>
          ) : (
            <span>
              <Add /> &nbsp;افزودن&nbsp;
            </span>
          )}
          مسیر ارتباطی
        </Button>
      </div>
      <div className="w-100">
        <Collapse in={activeNewPath}>
          <Card variant="elevation" className={classes.card}>
            <Formik
              initialValues={data}
              enableReinitialize
              onSubmit={handleAddOnePath}
            >
              {({ setFieldValue, values, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <CardContent>
                    <Box
                      component="form"
                      sx={{ flexGrow: 1 }}
                      noValidate
                      autoComplete="off"
                    >
                      <h5 className="mb-3">افزودن مسیر ارتباطی</h5>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            required
                            label="نوع*"
                            value={values.type}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("type", e.target.value);
                            }}
                          >
                            {currencies.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <span className="ms-1">{option.icon}</span>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label="لینک"
                            type="url"
                            required
                            variant="outlined"
                            value={values.socialLink}
                            name="socialLink"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("socialLink", e.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            dir="rtl"
                            required
                            id="outlined-basic"
                            label="آی دی (ID)"
                            variant="outlined"
                            value={values.socialId}
                            name="socialId"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("socialId", e.target.value);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Collapse in={errorFound}>
                      <Alert
                        className="mt-3"
                        severity="warning"
                        onClose={() => setErrorFound(false)}
                      >
                        خطا! نمیتوانید دو مورد مشابه هم اضافه کنید!
                      </Alert>
                    </Collapse>
                  </CardContent>
                  <CardActions>
                    <Grid
                      item
                      xs={12}
                      className="d-flex justify-content-end gap-2 ms-1"
                    >
                      <Button
                        type="button"
                        onClick={handleResetForm}
                        size="small"
                        color="inherit"
                        variant="outlined"
                      >
                        انصراف
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        disabled={
                          !values.socialId || !values.socialLink || !values.type
                        }
                        type="submit"
                      >
                        {statusEdit ? (
                          <span>
                            &nbsp;ویرایش مسیر ارتباطی{" "}
                            {currencies.map(
                              (currencie) =>
                                currencie.value == values.type &&
                                currencie.label
                            )}
                            &nbsp;
                          </span>
                        ) : (
                          <span>&nbsp;ثبت مسیر ارتباطی&nbsp;</span>
                        )}
                      </Button>
                    </Grid>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </Card>
        </Collapse>
      </div>

      <Box className="w-100">
        {pathes.map((item) => (
          <Card key={item.id} className={classes.cardList}>
            <CardContent>
              <div className="w-full d-flex justify-content-between flex-wrap">
                <div className="d-flex flex-1 gap-3">
                  <div className="d-flex">
                    <p>
                      {currencies.map(
                        (currencie) =>
                          currencie.value == item.social_type && (
                            <>
                              {currencie.icon} {currencie.label}
                            </>
                          )
                      )}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="text-secondary ms-2"> آی دی (ID): </p>
                    <p>{item.social_id}</p>
                  </div>
                  <div className="d-flex">
                    <p className="text-secondary ms-2">لینک: </p>
                    <a href={item.social_link} className="text-warning">
                      {item.social_link}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="text"
                    type="button"
                    onClick={() => editOneItem(item.id)}
                    color="warning"
                  >
                    <Edit className="fs-6 ms-1" />
                    ویرایش
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => handleClickOpen(item.id)}
                    color="error"
                  >
                    <Delete className="fs-6 ms-1" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <DialogBox {...propsDialog} />
      </Box>
    </Box>
  );
};

export default ManagePath;
