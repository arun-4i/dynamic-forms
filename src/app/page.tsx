import DynamicForm from "@/components/user-form/dynamic-form";

const page = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-200 to-pink-500 p-4">
      <h1 className="font-semibold text-2xl text-center">Dynamic User Form</h1>
      <DynamicForm/>
    </div>
  );
};

export default page;
