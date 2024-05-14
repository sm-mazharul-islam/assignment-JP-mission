// // import Container from "../../components/ui/Container";
// // import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

// // type FieldType = {
// //   email?: string;
// //   password?: string;
// //   remember?: string;
// // };

// // const Login = () => {
// // const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
// //   console.log('Success:', values);
// // };

// // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
// //   console.log('Failed:', errorInfo);
// // };
// // return (
// //   <Container>
// //     <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 bg-white shadow-xl mx-auto m-11  ">
// {
//   /*
//       <div className="w-96 p-7">
//       <h2 className="text-xl text-center">Login</h2>
//       <form>
//       <div className="form-control w-full max-w-xs">
//       <label className="label">
//       <span className="label-text">Email</span>
//       </label>
//       <input
//       type="text"
//       className="input input-bordered w-full max-w-xs"
//       />

//       <p className="text-red-600"></p>
//       </div>
//       <div className="form-control w-full max-w-xs">
//       <label className="label">
//       <span className="label-text">Password</span>
//       </label>
//       <input
//       type="password"
//       className="input input-bordered w-full max-w-xs"
//       />
//       <label className="label">
//       <span className="label-text">Forget Password?</span>
//       </label>
//       </div>

//       <input
//       className="btn btn-accent w-full"
//       value="Login"
//       type="submit"
//       />
//       <div></div>
//       </form>
//       <p>
//       New to Wedding Planner?{" "}
//       <Link className="text-secondary" to="/register">
//       Create new account
//       </Link>
//       </p>
//       <div className="divider">OR</div>
//       <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
//     </div> */
// }
// // <Form
// //   name="basic"
// //   // labelCol={{ span: 8 }}
// //   // wrapperCol={{ span: 16 }}
// //   // style={{ maxWidth: 600 }}
// //   initialValues={{ remember: true }}
// //   // onFinish={onFinish}
// //   // onFinishFailed={onFinishFailed}
// //   autoComplete="off"
// // >
// //   <h2 className="text-2xl font-bold mb-4 text-center md:mb-[60px]">
// //     Please Login
// //   </h2>
// //   <Form.Item<FieldType>
// //     label="Email"
// //     name="email"
// //     rules={[{ required: true, message: "Please input your username!" }]}
// //   >
// //     <Input />
// //   </Form.Item>

// //   <Form.Item<FieldType>
// //     label="Password"
// //     name="password"
// //     wrapperCol={{ offset: 0, span: 32 }}
// //     rules={[{ required: true, message: "Please input your password!" }]}
// //   >
// //     <Input.Password />
// //   </Form.Item>

// {
//   /* <Form.Item<FieldType>
//             name="remember"
//             valuePropName="checked"
//             wrapperCol={{ offset: 8, span: 16 }}
//           >
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item> */
// }
// {
//   /*
//           <Form.Item className="text-center">
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//           <p className="text-center">
//             New to this website?
//             <Link className="text-black" to="/register">
//               Create new account
//             </Link>
//           </p>
//           <Divider>OR</Divider>
//           <button className="w-full">CONTINUE WITH GOOGLE</button>
//         </Form> */
// }
// {
//   /* </div>
//     </Container>
//   );
// }; */
// }

// // export default Login;

const Login = () => {
  return (
    <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 shadow-xl mx-auto m-11 t4 lg:mb-60 ">
      <div className="w-96 p-7 ">
        <h2 className="text-xl text-center">Login</h2>
        <form>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
          </div>

          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          <div>
            <p className="text-red-600"></p>
          </div>
        </form>
        <p>
          New to Wedding Planner?{" "}
          <Link className="text-secondary" to="/register">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
