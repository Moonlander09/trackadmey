// API call function
export const fetchDashboardData = async (
  setData,
  setLoading,
  urlAPI,
  from,
  to
) => {
  try {
    setLoading(true);

    let url = urlAPI;
    if (from && to) {
      url += `?from=${from}&to=${to}`;
    }

    const res = await fetch(url, {
      credentials: "include",
      method: "GET", // so cookies/JWT are sent
    });
    const json = await res.json();

    if (json.status === "success") {
      setData(json.data);
    } else {
      setData(null);
    }
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    setData(null);
  } finally {
    setLoading(false);
  }
};



export const fetchAttendanceData = async (
  setData,
  setLoading,
  urlAPI,
  subjectId,
  from,
  to
) => {
  try {
    setLoading(true);

    if (!subjectId) {
      setData(null);
      return;
    }

    let url = `${urlAPI}/${subjectId}`;
    if (from && to) {
      url += `?from=${from}&to=${to}`;
    }

    const res = await fetch(url, {
      credentials: "include",
      method: "GET", // so cookies/JWT are sent
    });
    const json = await res.json();

    if (json.status === "success") {
      setData(json.data);
    } else {
      setData(null);
    }
  } catch (err) {
    console.error("Error fetching dashboard:");
    setData(null);
  } finally {
    setLoading(false);
  }
};


export const fetchSummaryData = async (
  setData,
  setLoading,
  urlAPI,
  subjectId,
  from,
  to
) => {
  try {
    setLoading(true);

    if (!subjectId) {
      setData(null);
      return;
    }

    let url = `${urlAPI}/${subjectId}/summary`;
    if (from && to) {
      url += `?from=${from}&to=${to}`;
    }

    const res = await fetch(url, {
      credentials: "include",
      method: "GET", // so cookies/JWT are sent
    });
    const json = await res.json();

    if (json.status === "success") {
      setData(json.data);
    } else {
      setData(null);
    }
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    setData(null);
  } finally {
    setLoading(false);
  }
};