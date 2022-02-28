// helpers
const mainContainerStyles = {
  container: {
    display: "flex",
    padding: "1rem",
    backgroundColor: "#E5E5E5",
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    flex: 1,
    overflowX: "hidden" as const,
    overflowY: "scroll" as const,
  },
}

const shadowButtonStyles = {
  color: "white",
  backgroundColor: "#6296E4",
  borderRadius: "0.5rem",
  fontWeight: 600,
  filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
}


// Quotations
export const quotationsStyles = {
  ...mainContainerStyles,
  btnMainContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "4rem",
  },
  btnSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  btnSubInnerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  btn: {
    ...shadowButtonStyles,
    width: "11rem",
  },
}

export const summaryStyles = {
  ...mainContainerStyles,
}

export const voucherStyles = {
  ...mainContainerStyles,
}


// Library
export const libraryTableToolbarStyles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolbarContainer: {
    display: "flex",
    alignItems: "center",
  },
  search: {
    padding: "4px",
  },
  deleteIcon: {
    padding: "0px 8px 0px 0px",
    color: "red",
  },
  filterIcon: {
    padding: "0px 8px 0px 0px",
    color: "#0A65FF",
  },
  addBtn: {
    color: "white",
    backgroundColor: "#0A65FF",
    borderRadius: "0.5rem",
    margin: "0px",
  },
};

export const libraryStyles = {
  ...mainContainerStyles,
  btn: {
    ...shadowButtonStyles,
    width: "11rem",
  },
  textField: {
    width: "11rem",
  },
  btnContainer: {
    justifyContent: "flex-start",
    marginBottom: "4rem",
    display: "flex",
  },
}

export const libraryTableStyles = {
  activeUsers: {
    fontSize: "1rem",
    color: "#606F89",
    fontWeight: 600,
  },
  totalUsers: {
    fontSize: "0.7rem",
    color: "#606F89",
  },
}

export const libraryCreateMemberStyles = {
  header: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: "0px",
    color: "#0A65FF",
    fontSize: "1.5rem",
  },
  formContainer: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as const,
  },
  addressNameContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  addBtnContainer: {
    margin: "2rem 1rem 0 0",
    display: "flex",
    justifyContent: "flex-end",
  },
  backBtn: {
    color: "#0A65FF",
    padding: "1rem",
  },
  addBtn: shadowButtonStyles,
}

export const libraryCreateGuestStyles = {
  ...libraryCreateMemberStyles,
  addBtnContainer: {
    ...libraryCreateMemberStyles.addBtnContainer,
    justifyContent: "space-between",
  }
}


// Utilities
export const guestProfileStyles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: "8px",
    height: "30px",
    width: "30px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },
  paragraph: {
    margin: "0px",
    color: "#464E5F",
    fontSize: "0.875rem",
  },
};

export const headerStyles = {
  container: {
    backgroundColor: "#C1BFBF",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "1rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "20px",
    height: "30px",
    width: "30px",
  },
  spanI: {
    marginRight: "12px",
    fontWeight: 500,
    color: "#1C5BBA",
    fontSize: "40px",
  },
  spanT: {
    margin: "0px",
    fontWeight: 500,
    color: "#41E93E",
    fontSize: "40px",
  },
}

export const navbarStyles = {
  container: {
    display: "flex",
    width: "100%",
    height: "3rem",
    backgroundColor: "#4283e4",
  },
  link: {
    padding: "0px 10px",
    margin: "0px 10px",
  },
}

export const sidebarStyles = {
  bottomContainer: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-end",
  }
}

export const tableRowTextCellStyles = {
  paragraph: {
    margin: "0px",
    fontSize: "0.875rem",
  },
};