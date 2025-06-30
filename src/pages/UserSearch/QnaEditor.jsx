import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import Search from "../../components/Search/Search";
import SearchSidebar from "../../components/SearchSidebar/SearchSidebar";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useLoaderData } from "react-router-dom";
import "./QnaEditor.css";
import { autosaveToWebhook } from "../../api/autosave";

function QnaEditor() {
  const [searchList, setSearchList] = useState([]);
  const [prevSearchList, setPrevSearchList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoadingSearchData, getSearchDataError } = [false, null];
  const { data: initialData } = useLoaderData();

  console.log(useLoaderData());

  useEffect(() => {
    if (initialData) {
      setSearchList(initialData);
      setPrevSearchList(initialData.map(search => ({
        search_id: search.search_id,
        name: search.customer_name || "",
        messages: search.messages || [],
      })));
      if (initialData.length > 0) {
        setSelectedIndex(0);
      }
    }
  }, [initialData]);

  const updateSearch = (field, value) => {
    const updated = [...null];
    updated[selectedIndex][field] = value;
    setSearchList(updated);
  };

  const onDelete = async (search_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Search?");
    if (!confirmed) return null;

    let updated;
    if (searchList[selectedIndex].unsaved) {
      updated = searchList.filter((search) => search.search_id !== search_id);
    } else {
      updated = await handleDelete(search_id);
    }
    if (!updated) return;
    setSearchList(updated);
    if (selectedIndex >= updated.length) {
      setSelectedIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleDelete = async (search_id) => {
    try {
      await deleteSearch(search_id); // delete from backend
      const updated = searchList.filter((search) => search.search_id !== search_id);
      toast.success(`Search with search_id ${search_id} deleted successfully!`);
      return updated;
    } catch (err) {
      toast.error("Failed to delete Search: " + err.message);
      return null;
    }
  };

  const addNewSearch = () => {
    const customerNumber = searchList.length + 1;
    const customerName = `Customer ${customerNumber}`;
    const newSearch = {
      search_id: String(Date.now()),
      user_id: "1",
      customer_name: customerName,
    };
    setSearchList((prev) => {
      const updated = [...prev, newSearch];
      setSelectedIndex(updated.length - 1); // Select the new Search
      return updated;
    });
    // Autosave the new Search
    autosaveToWebhook(newSearch);
  };


  if (isLoadingSearchData) return <div>Loading...</div>;
  if (getSearchDataError) return <div>Error: {getSearchDataError}</div>;
  return (
    <div className="search-editor-layout">
      <SearchSidebar
        searchList={searchList}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        onAdd={addNewSearch}
        handleDelete={onDelete}
        handleGoHome={() => window.location.href = "/"}
      />
      <div className="search-editor-panel">
        {searchList.length === 0 ? (
          <EmptyState />
        ) : (
          <Search
            search={searchList[selectedIndex]}
            onChange={updateSearch}
          />
        )}
      </div>
    </div>
  );
}

export default QnaEditor;
