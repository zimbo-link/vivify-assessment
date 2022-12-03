<?php

namespace App\Http\Controllers\Api;

use App\Models\ToDo;
use App\Http\Requests\ToDoRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\ToDoResource;

use function PHPUnit\Framework\isNull;

class ToDoController extends Controller
{
    public function index()
    {
        return ToDoResource::collection(ToDo::all());
    }

    public function store(ToDoRequest $request)
    {
        $data = $request->validated();
        $data['status'] = $request['status'] == "1" ? 1 : 0;
        $todo = ToDo::create($data);

        return new ToDoResource($todo);
    }

    public function show(ToDo $todo)
    {
        return new ToDoResource($todo);
    }

    public function update(ToDoRequest $request, ToDo $todo)
    {
        $data = $request->validated();
        $data['status'] = $request['status'] == "1" ? 1 : 0;
        $todo->update($data);

        return new ToDoResource($todo);
    }

    public function destroy(ToDo $todo)
    {
        $todo->delete();

        return response()->noContent();
    }

    public function complete($id)
    {
        ToDo::where('id', $id)->update(array('status' => 1));
        return response()->noContent();
    }
}
