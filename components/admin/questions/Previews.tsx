// components
import Editor from "@components/lexical/Editor";
// ui icons
import { BookmarkIcon } from "@ui/icons";

export const Preview1 = ({ block, handleCurrentBlock }: any) => {
  return (
    <>
      <div className="p-3 border border-gray-300" onClick={() => handleCurrentBlock("edit", block)}>
        <div className="text-bold text-gray-500 pb-2">Question</div>
        <div>
          <Editor
            id={block?.id}
            data={
              block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
            }
            onChange={(data: any) => {}}
            readOnly={true}
          />
        </div>
      </div>
      {block && block?.options && block?.options.length > 0 ? (
        <div
          className="p-3 border border-gray-300"
          onClick={() => handleCurrentBlock("edit", block)}
        >
          <div className="text-bold text-gray-500 pb-2">Options</div>
          {block?.options.map((field: any, index: number) => (
            <div key={index} className="flex items-center gap-2 pb-3">
              <div
                className={`border border-solid border-violet-100 flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px] cursor-move items-center justify-center hover:bg-gray-100 ${
                  block?.data?.answers &&
                  block?.data?.answers.length > 0 &&
                  block?.data?.answers.includes(field.hash) &&
                  `bg-violet-100 text-yellow-100`
                } ${!block?.multiple ? `rounded-full` : `rounded-sm`}`}
              >
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]}
              </div>

              <div className="flex w-full items-center gap-2 rounded-sm" key={field.id}>
                <div className="w-full">
                  <Editor
                    id={field.hash}
                    readOnly={true}
                    data={
                      field.data && field.data?.name && field.data?.name !== null
                        ? field.data?.name
                        : field.data && field.data.content && field.data.content !== null
                        ? field.data.content
                        : field.data && field.data !== null
                        ? field.data
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted p-2"> Options are not created yet</div>
      )}
    </>
  );
};

export const Preview2 = ({ block, handleCurrentBlock }: any) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div
          className="p-3 border border-gray-300 h-full w-full"
          onClick={() => handleCurrentBlock("edit", block)}
        >
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div>
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div
          className="p-3 border border-gray-300"
          onClick={() => handleCurrentBlock("edit", block)}
        >
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div>
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
        {block && block?.options && block?.options.length > 0 ? (
          <div
            className="p-3 border border-gray-300"
            onClick={() => handleCurrentBlock("edit", block)}
          >
            <div className="text-bold text-gray-500 pb-2">Options</div>
            {block?.options.map((field: any, index: number) => (
              <div key={index} className="flex items-center gap-2 pb-3">
                <div
                  className={`border border-solid border-violet-100 flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px] cursor-move items-center justify-center hover:bg-gray-100 ${
                    block?.data?.answers &&
                    block?.data?.answers.length > 0 &&
                    block?.data?.answers.includes(field.hash) &&
                    `bg-violet-100 text-yellow-100`
                  } ${!block?.multiple ? `rounded-full` : `rounded-sm`}`}
                >
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]}
                </div>

                <div className="flex w-full items-center gap-2 rounded-sm" key={field.id}>
                  <div className="w-full">
                    <Editor
                      id={field.hash}
                      readOnly={true}
                      data={
                        field.data && field.data?.name && field.data?.name !== null
                          ? field.data?.name
                          : field.data && field.data.content && field.data.content !== null
                          ? field.data.content
                          : field.data && field.data !== null
                          ? field.data
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted p-2"> Options are not created yet</div>
        )}
      </div>
    </div>
  );
};

export const Preview3 = ({ block, handleCurrentBlock }: any) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div
          className="p-3 border border-gray-300 h-full w-full"
          onClick={() => handleCurrentBlock("edit", block)}
        >
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div>
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        {block && block?.options && block?.options.length > 0 ? (
          <div
            className="p-3 border border-gray-300"
            onClick={() => handleCurrentBlock("edit", block)}
          >
            <div className="text-bold text-gray-500 pb-2">Options</div>
            {block?.options.map((field: any, index: number) => (
              <div key={index} className="flex items-center gap-2 pb-3">
                <div
                  className={`border border-solid border-violet-100 flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px] cursor-move items-center justify-center hover:bg-gray-100 ${
                    block?.data?.answers &&
                    block?.data?.answers.length > 0 &&
                    block?.data?.answers.includes(field.hash) &&
                    `bg-violet-100 text-yellow-100`
                  } ${!block?.multiple ? `rounded-full` : `rounded-sm`}`}
                >
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]}
                </div>

                <div className="flex w-full items-center gap-2 rounded-sm" key={field.id}>
                  <div className="w-full">
                    <Editor
                      id={field.hash}
                      readOnly={true}
                      data={
                        field.data && field.data?.name && field.data?.name !== null
                          ? field.data?.name
                          : field.data && field.data.content && field.data.content !== null
                          ? field.data.content
                          : field.data && field.data !== null
                          ? field.data
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted p-2"> Options are not created yet</div>
        )}
      </div>
    </div>
  );
};

export const Preview4 = ({ block, handleCurrentBlock }: any) => {
  return (
    <>
      <div className="p-3" onClick={() => handleCurrentBlock("edit", block)}>
        <div className="text-bold text-gray-500 pb-2">Question</div>
        <div className="bg-[#f3f3f3] w-full h-[26px]  flex justify-between items-center rounded-sm">
          <div className="flex justify-center items-start">
            <div className="w-[26px] h-[26px] bg-[#000000] text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px]">
              {1}
            </div>
          </div>
          <div className="mx-[2px]">
            <BookmarkIcon width="18" height="18" />
          </div>
        </div>
        <div className="pt-4">
          <Editor
            id={block?.id}
            data={
              block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
            }
            onChange={(data: any) => {}}
            readOnly={true}
          />
        </div>
      </div>
      <div className="text-bold text-gray-500 pb-2">Options</div>
      {block && block?.options && block?.options.length > 0 ? (
        <div className="">
          {block?.options.map((_option: any, _idx: number) => (
            <div
              key={_idx}
              className={`flex items-center gap-2 border-2  rounded-lg my-2  px-2 py-2 cursor-pointer w-full `}
            >
              <div
                className={`border border-solid border-[#1e1e1e] flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px]  items-center  justify-center hover:bg-gray-100
           
              ${!block?.multiple ? `rounded-full` : `rounded-sm`} 
              `}
              >
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_idx]}
              </div>
              <div className={`relative flex w-full flex-grow items-center px-5 bg-opacity-10`}>
                {_option?.data && (
                  <div className="w-full">
                    <Editor
                      data={
                        _option.data && _option.data?.name && _option.data?.name !== null
                          ? _option.data?.name
                          : _option.data && _option.data.content && _option.data.content !== null
                          ? _option.data.content
                          : _option.data && _option.data !== null
                          ? _option.data
                          : null
                      }
                      readOnly={true}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center text-gray-500">No options are available.</div>
      )}
    </>
  );
};

export const Preview5 = ({ block, handleCurrentBlock }: any) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="p-3" onClick={() => handleCurrentBlock("edit", block)}>
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div className="bg-[#f3f3f3] w-full h-[26px]  flex justify-between items-center rounded-sm">
            <div className="flex justify-center items-start">
              <div className="w-[26px] h-[26px] bg-[#000000] text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px]">
                {1}
              </div>
            </div>
            <div className="mx-[2px]">
              <BookmarkIcon width="18" height="18" />
            </div>
          </div>
          <div className="pt-4">
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="p-3" onClick={() => handleCurrentBlock("edit", block)}>
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div className="bg-[#f3f3f3] w-full h-[26px]  flex justify-between items-center rounded-sm">
            <div className="flex justify-center items-start">
              <div className="w-[26px] h-[26px] bg-[#000000] text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px]">
                {1}
              </div>
            </div>
            <div className="mx-[2px]">
              <BookmarkIcon width="18" height="18" />
            </div>
          </div>
          <div className="pt-4">
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
        <div className="text-bold text-gray-500 pb-2">Options</div>
        {block && block?.options && block?.options.length > 0 ? (
          <div className="">
            {block?.options.map((_option: any, _idx: number) => (
              <div
                key={_idx}
                className={`flex items-center gap-2 border-2  rounded-lg my-2  px-2 py-2 cursor-pointer w-full `}
              >
                <div
                  className={`border border-solid border-[#1e1e1e] flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px]  items-center  justify-center hover:bg-gray-100
           
              ${!block?.multiple ? `rounded-full` : `rounded-sm`} 
              `}
                >
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_idx]}
                </div>
                <div className={`relative flex w-full flex-grow items-center px-5 bg-opacity-10`}>
                  {_option?.data && (
                    <div className="w-full">
                      <Editor
                        data={
                          _option.data && _option.data?.name && _option.data?.name !== null
                            ? _option.data?.name
                            : _option.data && _option.data.content && _option.data.content !== null
                            ? _option.data.content
                            : _option.data && _option.data !== null
                            ? _option.data
                            : null
                        }
                        readOnly={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 text-center text-gray-500">No options are available.</div>
        )}
      </div>
    </div>
  );
};

export const Preview6 = ({ block, handleCurrentBlock }: any) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="p-3" onClick={() => handleCurrentBlock("edit", block)}>
          <div className="text-bold text-gray-500 pb-2">Question</div>
          <div className="bg-[#f3f3f3] w-full h-[26px]  flex justify-between items-center rounded-sm">
            <div className="flex justify-center items-start">
              <div className="w-[26px] h-[26px] bg-[#000000] text-white text-center md:text-sm p-1 font-bold flex justify-center items-center self-start text-[12px]">
                {1}
              </div>
            </div>
            <div className="mx-[2px]">
              <BookmarkIcon width="18" height="18" />
            </div>
          </div>
          <div className="pt-4">
            <Editor
              id={block?.id}
              data={
                block?.data?.content && block?.data?.content !== null ? block?.data?.content : null
              }
              onChange={(data: any) => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-bold text-gray-500 pb-2 ">Options</div>
        {block && block?.options && block?.options.length > 0 ? (
          <div className="">
            {block?.options.map((_option: any, _idx: number) => (
              <div
                key={_idx}
                className={`flex items-center gap-2 border-2  rounded-lg my-2  px-2 py-2 cursor-pointer w-full `}
              >
                <div
                  className={`border border-solid border-[#1e1e1e] flex-shrink-0 hover:border-gray-400 flex h-[26px] w-[26px]  items-center  justify-center hover:bg-gray-100
           
              ${!block?.multiple ? `rounded-full` : `rounded-sm`} 
              `}
                >
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[_idx]}
                </div>
                <div className={`relative flex w-full flex-grow items-center px-5 bg-opacity-10`}>
                  {_option?.data && (
                    <div className="w-full">
                      <Editor
                        data={
                          _option.data && _option.data?.name && _option.data?.name !== null
                            ? _option.data?.name
                            : _option.data && _option.data.content && _option.data.content !== null
                            ? _option.data.content
                            : _option.data && _option.data !== null
                            ? _option.data
                            : null
                        }
                        readOnly={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 text-center text-gray-500">No options are available.</div>
        )}
      </div>
    </div>
  );
};
